import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Megaphone,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  Eye,
  Award,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  Plus,
  Filter,
  Download,
  Calendar,
  Share2,
  Globe,
  CheckCircle,
  Clock,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  initialMarketingKpis,
  initialLeadSources,
  initialWeeklyTrends,
  initialCampaigns,
  initialFunnelData,
  initialEvents,
  initialSocialPosts,
  type Campaign,
} from "@/lib/services/marketing";
import { Card, PageHeader, StatusBadge } from "@/components/erp/ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

function formatScheduledDate(dateStr: string) {
  if (!dateStr) return "";
  const parts = dateStr.split(" ");
  const ymd = parts[0];
  const time = parts[1] || "";
  const ampm = parts[2] || "";
  if (ymd && ymd.includes("-")) {
    const dateParts = ymd.split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (month && day && year) {
      const mIdx = parseInt(month, 10) - 1;
      if (mIdx >= 0 && mIdx < 12) {
        return `${monthNames[mIdx]} ${parseInt(day, 10)}, ${year} · ${time} ${ampm.toLowerCase()}`.trim();
      }
    }
  }
  return dateStr.replace(/AM|PM/g, (m) => m.toLowerCase());
}

export const Route = createFileRoute("/marketing/dashboard")({
  head: () => ({
    meta: [
      { title: "Marketing Director Dashboard | Vrindavan ERP" },
      {
        name: "description",
        content:
          "Lead generation analytics, campaign performance, advertising ROI and multi-channel attribution.",
      },
    ],
  }),
  component: MarketingDashboardPage,
});

export function MarketingDashboardPage() {
  const [kpis] = useState(initialMarketingKpis);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [selectedProject, setSelectedProject] = useState("all");
  const [newCampaignModal, setNewCampaignModal] = useState(false);
  const [newCampaignData, setNewCampaignData] = useState({
    name: "",
    project: "Vrindavan Heights",
    platform: "Google Ads" as Campaign["platform"],
    budget: 200000,
    startDate: "2026-04-20",
    endDate: "2026-05-20",
  });

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignData.name.trim()) {
      toast.error("Please enter a campaign name");
      return;
    }
    const created: Campaign = {
      id: `CMP-${Date.now().toString().slice(-4)}`,
      name: newCampaignData.name,
      project: newCampaignData.project,
      platform: newCampaignData.platform,
      status: "Active",
      budget: Number(newCampaignData.budget),
      spent: 0,
      leadsGenerated: 0,
      cpl: 0,
      roi: 0,
      startDate: newCampaignData.startDate,
      endDate: newCampaignData.endDate,
    };
    setCampaigns([created, ...campaigns]);
    toast.success(`Campaign "${created.name}" launched successfully!`);
    setNewCampaignModal(false);
    setNewCampaignData({
      name: "",
      project: "Vrindavan Heights",
      platform: "Google Ads",
      budget: 200000,
      startDate: "2026-04-20",
      endDate: "2026-05-20",
    });
  };

  const handleExportSummary = () => {
    toast.success("Downloading Marketing Executive ROI Report (CSV)...");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="inline-flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-md shrink-0">
              <Megaphone className="size-4 sm:size-5" />
            </span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              Marketing & Growth Portal
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary line-clamp-2 sm:line-clamp-none">
            Multi-channel campaign telemetry, ad spend attribution, cost-per-lead and visitor
            conversion intelligence.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full sm:w-[170px] h-9 text-xs bg-card border-border">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="vh">Vrindavan Heights</SelectItem>
                <SelectItem value="gv">Green Valley Villas</SelectItem>
                <SelectItem value="ct">Cyber Techpark Tower</SelectItem>
                <SelectItem value="rg">Radha Govind City</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportSummary}
              className="h-9 gap-1.5 text-xs border-border justify-center"
            >
              <Download className="size-3.5" />
              <span>Export CSV</span>
            </Button>
          </div>

          <Button
            size="sm"
            onClick={() => setNewCampaignModal(true)}
            className="w-full sm:w-auto h-9 gap-1.5 text-xs bg-gradient-to-r from-[#4F20D8] to-[#5B2BE0] text-white shadow-sm font-semibold justify-center"
          >
            <Plus className="size-3.5" />
            <span>New Campaign</span>
          </Button>
        </div>
      </div>

      {/* 8 Primary KPI Cards - 2 cols on mobile for compact, executive UI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        <Card className="p-3 sm:p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm rounded-xl sm:rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-text-secondary text-[11px] sm:text-xs font-medium">
            <span className="truncate pr-1">Total Leads Gen</span>
            <Users className="size-3.5 sm:size-4 text-brand shrink-0" />
          </div>
          <div className="mt-1.5 sm:mt-2 flex flex-col xs:flex-row items-start xs:items-baseline justify-between sm:justify-start gap-1 sm:gap-2">
            <span className="text-lg sm:text-2xl font-bold text-foreground">
              {kpis.totalLeads.toLocaleString()}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 flex items-center shrink-0">
              <ArrowUpRight className="size-2.5 sm:size-3" />+{kpis.totalLeadsGrowth}%
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-text-muted mt-1 truncate">Verified inbound prospects</p>
        </Card>

        <Card className="p-3 sm:p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm rounded-xl sm:rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-text-secondary text-[11px] sm:text-xs font-medium">
            <span className="truncate pr-1">Cost Per Lead</span>
            <DollarSign className="size-3.5 sm:size-4 text-emerald-600 shrink-0" />
          </div>
          <div className="mt-1.5 sm:mt-2 flex flex-col xs:flex-row items-start xs:items-baseline justify-between sm:justify-start gap-1 sm:gap-2">
            <span className="text-lg sm:text-2xl font-bold text-foreground">
              ₹{kpis.costPerLead}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 flex items-center shrink-0">
              -{kpis.cplReduction}% opt
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-text-muted mt-1 truncate">Blended across platforms</p>
        </Card>

        <Card className="p-3 sm:p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm rounded-xl sm:rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-text-secondary text-[11px] sm:text-xs font-medium">
            <span className="truncate pr-1">Active Campaigns</span>
            <Megaphone className="size-3.5 sm:size-4 text-brand shrink-0" />
          </div>
          <div className="mt-1.5 sm:mt-2 flex flex-col xs:flex-row items-start xs:items-baseline justify-between sm:justify-start gap-1 sm:gap-2">
            <span className="text-lg sm:text-2xl font-bold text-foreground">
              {kpis.activeCampaigns}
            </span>
            <span className="text-[10px] sm:text-xs text-brand font-medium truncate">5 Networks</span>
          </div>
          <p className="text-[10px] sm:text-xs text-text-muted mt-1 truncate">Google, Meta, 99acres</p>
        </Card>

        <Card className="p-3 sm:p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm rounded-xl sm:rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-text-secondary text-[11px] sm:text-xs font-medium">
            <span className="truncate pr-1">Conversion Rate</span>
            <TrendingUp className="size-3.5 sm:size-4 text-brand shrink-0" />
          </div>
          <div className="mt-1.5 sm:mt-2 flex flex-col xs:flex-row items-start xs:items-baseline justify-between sm:justify-start gap-1 sm:gap-2">
            <span className="text-lg sm:text-2xl font-bold text-foreground">
              {kpis.conversionRate}%
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 truncate">Lead → Visit</span>
          </div>
          <p className="text-[10px] sm:text-xs text-text-muted mt-1 truncate">Industry avg: 5.2%</p>
        </Card>

        <Card className="p-3 sm:p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm rounded-xl sm:rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-text-secondary text-[11px] sm:text-xs font-medium">
            <span className="truncate pr-1">Total Ad Spend</span>
            <Target className="size-3.5 sm:size-4 text-rose-600 shrink-0" />
          </div>
          <div className="mt-1.5 sm:mt-2 flex flex-col xs:flex-row items-start xs:items-baseline justify-between sm:justify-start gap-1 sm:gap-2">
            <span className="text-lg sm:text-2xl font-bold text-foreground">
              ₹{(kpis.totalAdSpend / 100000).toFixed(1)}L
            </span>
            <span className="text-[10px] sm:text-xs text-text-muted truncate">84% budget</span>
          </div>
          <p className="text-[10px] sm:text-xs text-text-muted mt-1 truncate">MTD ad budget utilized</p>
        </Card>

        <Card className="p-3 sm:p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm rounded-xl sm:rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-text-secondary text-[11px] sm:text-xs font-medium">
            <span className="truncate pr-1">Marketing ROI</span>
            <Sparkles className="size-3.5 sm:size-4 text-amber-500 shrink-0" />
          </div>
          <div className="mt-1.5 sm:mt-2 flex flex-col xs:flex-row items-start xs:items-baseline justify-between sm:justify-start gap-1 sm:gap-2">
            <span className="text-lg sm:text-2xl font-bold text-emerald-600">
              {kpis.roiMultiplier}x
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 truncate">Pipeline</span>
          </div>
          <p className="text-[10px] sm:text-xs text-text-muted mt-1 truncate">₹6.2 Cr pipeline</p>
        </Card>

        <Card className="p-3 sm:p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm rounded-xl sm:rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-text-secondary text-[11px] sm:text-xs font-medium">
            <span className="truncate pr-1">Site Visits</span>
            <Eye className="size-3.5 sm:size-4 text-brand shrink-0" />
          </div>
          <div className="mt-1.5 sm:mt-2 flex flex-col xs:flex-row items-start xs:items-baseline justify-between sm:justify-start gap-1 sm:gap-2">
            <span className="text-lg sm:text-2xl font-bold text-foreground">
              {kpis.siteVisitsBooked}
            </span>
            <span className="text-[10px] sm:text-xs text-brand font-medium truncate">+42 wk</span>
          </div>
          <p className="text-[10px] sm:text-xs text-text-muted mt-1 truncate">Confirmed pickups</p>
        </Card>

        <Card className="p-3 sm:p-4 bg-card border border-border/70 hover:border-brand/40 transition-all shadow-sm rounded-xl sm:rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between text-text-secondary text-[11px] sm:text-xs font-medium">
            <span className="truncate pr-1">Top Source</span>
            <Award className="size-3.5 sm:size-4 text-amber-500 shrink-0" />
          </div>
          <div className="mt-1.5 sm:mt-2 flex flex-col xs:flex-row items-start xs:items-baseline justify-between sm:justify-start gap-1 sm:gap-2">
            <span className="text-base sm:text-xl font-bold text-foreground truncate">
              Google Ads
            </span>
          </div>
          <p className="text-[10px] sm:text-xs text-emerald-600 font-medium mt-1 truncate">980 @ ₹460 CPL</p>
        </Card>
      </div>

      {/* Row 2: Charts (Leads by Source Donut & Weekly Trend Area) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Weekly Trend Line/Area Chart */}
        <Card className="p-5 bg-card border border-border lg:col-span-7 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Weekly Inbound Lead Velocity & Visits
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Leads generated vs confirmed site visits over the last 4 weeks
              </p>
            </div>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-brand/10 text-brand">
              Live Analytics
            </span>
          </div>

          <div className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={initialWeeklyTrends}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F20D8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4F20D8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#10184A",
                    borderColor: "#331fa3",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "12px", fontSize: "12px" }} />
                <Area
                  type="monotone"
                  dataKey="leads"
                  name="Inbound Leads"
                  stroke="#4F20D8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorLeads)"
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  name="Site Visits Booked"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorVisits)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Leads by Source Donut */}
        <Card className="p-5 bg-card border border-border lg:col-span-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Leads by Advertising Source</h2>
              <p className="text-xs text-text-muted mt-0.5">
                Distribution across primary digital marketing channels
              </p>
            </div>
          </div>

          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={initialLeadSources}
                  dataKey="leads"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {initialLeadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#10184A",
                    borderColor: "#331fa3",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                  }}
                  formatter={(value: any, name: any) => [`${value} Leads`, name]}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 3: Marketing Conversion Funnel & Campaign Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Full Marketing Funnel */}
        <Card className="p-5 bg-card border border-border lg:col-span-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Full-Funnel Real Estate Conversion
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Impression → Inquiries → Visits → Final Bookings
              </p>
            </div>
            <Target className="size-4 text-brand" />
          </div>

          <div className="space-y-3 pt-4">
            {initialFunnelData.map((item, idx) => {
              const maxVal = initialFunnelData[0]?.count || 1;
              const percentOfTop = ((item.count / maxVal) * 100).toFixed(1);
              return (
                <div key={item.stage} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{item.stage}</span>
                    <span className="font-bold text-text-secondary">
                      {item.count.toLocaleString()}
                      {idx > 0 && (
                        <span className="text-[10px] text-text-muted ml-1">({percentOfTop}%)</span>
                      )}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.max(4, Math.min(100, (item.count / maxVal) * 100))}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Campaign Spend vs Leads Bar Chart */}
        <Card className="p-5 bg-card border border-border lg:col-span-7 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Campaign Spend vs Inbound Leads
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Budget efficiency across active campaigns
              </p>
            </div>
            <Link
              to="/marketing/campaigns"
              className="text-xs text-brand hover:underline flex items-center gap-1 font-medium"
            >
              All Campaigns <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <div className="h-[290px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={campaigns.slice(0, 5)}
                margin={{ top: 10, right: 10, left: -10, bottom: 42 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  axisLine={false}
                  tickLine={false}
                  height={45}
                  tickFormatter={(val: string) => (val.length > 13 ? `${val.slice(0, 12)}…` : val)}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#10184A",
                    borderColor: "#331fa3",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                <Bar
                  yAxisId="left"
                  dataKey="spent"
                  name="Spent (₹)"
                  fill="#4F20D8"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="leadsGenerated"
                  name="Leads"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 4: Top Campaigns Table */}
      <Card className="p-5 bg-card border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/60 gap-2">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Top Active Marketing Campaigns
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Real-time budget utilization, lead generation and ROI multipliers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/marketing/campaigns"
              className="text-xs text-brand font-medium hover:underline flex items-center gap-1"
            >
              View Full Campaign Matrix <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto mt-4 -mx-5 px-5 sm:mx-0 sm:px-0">
          <table className="w-full text-xs sm:text-sm text-left border-collapse min-w-[880px] whitespace-nowrap">
            <thead className="bg-muted/70 text-text-secondary uppercase tracking-wider text-xs font-semibold border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold whitespace-nowrap">Campaign Name</th>
                <th className="py-2.5 px-3 font-semibold whitespace-nowrap">Project</th>
                <th className="py-2.5 px-3 font-semibold whitespace-nowrap">Platform</th>
                <th className="py-2.5 px-3 font-semibold whitespace-nowrap text-center">Status</th>
                <th className="py-2.5 px-3 font-semibold whitespace-nowrap text-right">Budget</th>
                <th className="py-2.5 px-3 font-semibold whitespace-nowrap text-right">Spent</th>
                <th className="py-2.5 px-3 font-semibold whitespace-nowrap text-right">Leads</th>
                <th className="py-2.5 px-3 font-semibold whitespace-nowrap text-right">CPL</th>
                <th className="py-2.5 px-3 font-semibold whitespace-nowrap text-right">Est. ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-foreground font-medium">
              {campaigns.map((c) => (
                <tr
                  key={c.id}
                  className="odd:bg-card even:bg-muted/15 hover:bg-muted/40 transition-colors"
                >
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="font-semibold text-foreground block">{c.name}</span>
                    <span className="text-xs text-text-muted">{c.id}</span>
                  </td>
                  <td className="py-2.5 px-3 text-text-secondary whitespace-nowrap">{c.project}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold bg-brand/10 text-brand">
                      {c.platform}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        c.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                          : c.status === "Completed"
                            ? "bg-brand/10 text-brand border border-brand/20"
                            : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    ₹{c.budget.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-text-secondary text-right whitespace-nowrap">
                    ₹{c.spent.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-foreground text-right whitespace-nowrap">
                    {c.leadsGenerated}
                  </td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold text-right whitespace-nowrap">
                    {c.cpl > 0 ? `₹${c.cpl}` : "-"}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-brand text-right whitespace-nowrap">
                    {c.roi > 0 ? `${c.roi}x` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Row 5: Upcoming Events & Social Media Calendar Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Events Widget */}
        <Card className="p-5 bg-card border border-border shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Upcoming Site Visit Drives & Expos
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Customer experiential events and channel partner meets
              </p>
            </div>
            <Link
              to="/marketing/events"
              className="text-xs text-brand font-medium hover:underline flex items-center gap-1"
            >
              All Events <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <div className="space-y-3 pt-3">
            {initialEvents && initialEvents.length > 0 ? (
              initialEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/70 hover:border-brand/30 bg-muted/20 transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-foreground block">{evt.name}</span>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3 text-brand" /> {evt.eventDate}
                      </span>
                      <span>{evt.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600 block">
                      {evt.confirmedAttendance} / {evt.registrations} Attending
                    </span>
                    <span className="text-xs text-brand font-medium">{evt.type}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-border/70 bg-muted/10">
                <Calendar className="size-8 text-text-muted mb-2 stroke-[1.5]" />
                <p className="text-xs font-semibold text-foreground">
                  No upcoming site visit drives
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  Scheduled site visits and expos will appear here.
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Social Media Content Calendar */}
        <Card className="p-5 bg-card border border-border shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Social & Creative Content Pipeline
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Brand engagement posts across YouTube, Meta and LinkedIn
              </p>
            </div>
            <Link
              to="/marketing/social-media"
              className="text-xs text-brand font-medium hover:underline flex items-center gap-1"
            >
              Social Hub <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <div className="space-y-3 pt-3">
            {initialSocialPosts && initialSocialPosts.length > 0 ? (
              initialSocialPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/70 hover:border-brand/30 bg-muted/20 transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-foreground block line-clamp-1">
                      {post.title}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="font-semibold text-brand">{post.platform}</span>
                      <span>{formatScheduledDate(post.scheduledDate)}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                        post.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                          : "bg-brand/10 text-brand border border-brand/20"
                      }`}
                    >
                      {post.status}
                    </span>
                    {post.reach > 0 && (
                      <span className="text-xs text-text-muted block mt-0.5">
                        {post.reach.toLocaleString()} Reach
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-border/70 bg-muted/10">
                <Share2 className="size-8 text-text-muted mb-2 stroke-[1.5]" />
                <p className="text-xs font-semibold text-foreground">No social content scheduled</p>
                <p className="text-xs text-text-muted mt-0.5">
                  Upcoming scheduled posts across channels will display here.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* New Campaign Modal */}
      <Dialog open={newCampaignModal} onOpenChange={setNewCampaignModal}>
        <DialogContent className="w-[95vw] sm:max-w-xl md:max-w-2xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col bg-card border-border overflow-hidden">
          <DialogHeader className="px-5 sm:px-6 pt-5 pb-4 border-b border-border shrink-0 text-left">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-foreground">
              <Megaphone className="size-5 text-brand" /> Launch New Marketing Campaign
            </DialogTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Configure cross-channel budget allocation, ad networks, and project conversion
              targeting.
            </p>
          </DialogHeader>

          <form onSubmit={handleCreateCampaign} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 scrollbar-thin">
              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">
                  Campaign Title *
                </Label>
                <Input
                  required
                  placeholder="e.g. Vrindavan Akshaya Tritiya Gold Offer 2026"
                  value={newCampaignData.name}
                  onChange={(e) => setNewCampaignData({ ...newCampaignData, name: e.target.value })}
                  className="h-10 sm:h-11 text-sm rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">
                    Target Project
                  </Label>
                  <Select
                    value={newCampaignData.project}
                    onValueChange={(val) =>
                      setNewCampaignData({ ...newCampaignData, project: val })
                    }
                  >
                    <SelectTrigger className="h-10 sm:h-11 text-sm rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vrindavan Heights">Vrindavan Heights</SelectItem>
                      <SelectItem value="Green Valley Villas">Green Valley Villas</SelectItem>
                      <SelectItem value="Cyber Techpark Tower">Cyber Techpark Tower</SelectItem>
                      <SelectItem value="Radha Govind City">Radha Govind City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">
                    Advertising Network
                  </Label>
                  <Select
                    value={newCampaignData.platform}
                    onValueChange={(val: any) =>
                      setNewCampaignData({ ...newCampaignData, platform: val })
                    }
                  >
                    <SelectTrigger className="h-10 sm:h-11 text-sm rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Google Ads">Google Ads</SelectItem>
                      <SelectItem value="Meta (FB/IG)">Meta (FB/IG)</SelectItem>
                      <SelectItem value="99acres">99acres</SelectItem>
                      <SelectItem value="MagicBricks">MagicBricks</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp Broadcast</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn B2B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">
                  Ad Budget Allocation (₹ INR)
                </Label>
                <Input
                  type="number"
                  min={10000}
                  step={5000}
                  required
                  value={newCampaignData.budget}
                  onChange={(e) =>
                    setNewCampaignData({ ...newCampaignData, budget: Number(e.target.value) })
                  }
                  className="h-10 sm:h-11 text-sm rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">
                    Start Date
                  </Label>
                  <Input
                    type="date"
                    value={newCampaignData.startDate}
                    onChange={(e) =>
                      setNewCampaignData({ ...newCampaignData, startDate: e.target.value })
                    }
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
                <div>
                  <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">End Date</Label>
                  <Input
                    type="date"
                    value={newCampaignData.endDate}
                    onChange={(e) =>
                      setNewCampaignData({ ...newCampaignData, endDate: e.target.value })
                    }
                    className="h-10 sm:h-11 text-sm rounded-xl"
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setNewCampaignModal(false)}
                className="rounded-xl h-10 px-5 text-sm w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand hover:bg-brand/90 text-white rounded-xl h-10 px-6 text-sm font-semibold shadow-md w-full sm:w-auto"
              >
                Launch Campaign
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
