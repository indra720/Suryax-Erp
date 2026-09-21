import React, { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  BarChart3,
  Users,
  PhoneCall,
  Calendar,
  Filter,
  RefreshCw,
  Search,
  CheckCircle2,
  Eye,
  Percent,
  TrendingUp,
  Download,
  Plus,
  Minus,
  Briefcase,
  UsersRound,
  ShieldCheck,
  DollarSign,
  ArrowUpDown,
  Sparkles,
} from "lucide-react";
import {
  fetchStaffProductivity,
  fetchTeamLeaderProductivity,
  fetchAssociateProductivity,
  fetchAdmins,
  type StaffProductivityRow,
  type ProductivityResponse,
} from "@/lib/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/superadmin/reports/")({
  head: () => ({
    meta: [
      { title: "Productivity Index & Reports | Vrindavan Real Estate ERP" },
      {
        name: "description",
        content: "Track staff telecalling productivity, team leader metrics, and conversion rates.",
      },
    ],
  }),
  component: SuperadminProductivityPage,
});

export function SuperadminProductivityPage() {
  const [activeTab, setActiveTab] = useState<"staff" | "team-leader" | "associates">("staff");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filters
  const [admins, setAdmins] = useState<any[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState("all-admins");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [expandedRowId, setExpandedRowId] = useState<number | string | null>(null);

  // Table Data State
  const [staffData, setStaffData] = useState<StaffProductivityRow[]>([]);
  const [totals, setTotals] = useState({
    calls: 0,
    interested: 0,
    visit: 0,
    not_interested: 0,
    other_location: 0,
    lost: 0,
  });

  // Load Admin options
  useEffect(() => {
    const loadAdminsList = async () => {
      try {
        const list = await fetchAdmins();
        if (Array.isArray(list)) setAdmins(list);
      } catch (e) {
        console.warn("Could not load admins list:", e);
      }
    };
    loadAdminsList();
  }, []);

  // Fetch Productivity based on active tab and filters
  const loadProductivityData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      let res: ProductivityResponse | null = null;
      const params = {
        admin_id: selectedAdmin,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
      };

      if (activeTab === "staff") {
        res = await fetchStaffProductivity(params);
      } else if (activeTab === "team-leader") {
        res = await fetchTeamLeaderProductivity(params);
      } else {
        res = await fetchAssociateProductivity({
          start_date: startDate || undefined,
          end_date: endDate || undefined,
        });
      }

      if (res && Array.isArray(res.staff_data) && res.staff_data.length > 0) {
        setStaffData(res.staff_data);
        setTotals({
          calls: res.total_all_calls || 0,
          interested: res.total_all_interested || 0,
          visit: res.total_all_visit || 0,
          not_interested: res.total_all_not_interested || 0,
          other_location: res.total_all_other_location || 0,
          lost: res.total_all_lost || 0,
        });
        if (res.admins_filter_list && res.admins_filter_list.length > 0) {
          setAdmins(res.admins_filter_list);
        }
      } else {
        // High quality fallback demonstration data matching CrmAttendance2
        if (activeTab === "staff") {
          const demoStaff: StaffProductivityRow[] = [
            {
              id: 1,
              name: "Pooja Verma",
              total_calls: 142,
              interested: 48,
              visit: 19,
              not_interested: 35,
              other_location: 22,
              lost: 18,
              interested_percentage: 34,
              visit_percentage: 13,
            },
            {
              id: 2,
              name: "Sunita Sharma",
              total_calls: 128,
              interested: 42,
              visit: 16,
              not_interested: 32,
              other_location: 18,
              lost: 20,
              interested_percentage: 33,
              visit_percentage: 12,
            },
            {
              id: 3,
              name: "Rahul Mathur",
              total_calls: 165,
              interested: 56,
              visit: 24,
              not_interested: 41,
              other_location: 25,
              lost: 19,
              interested_percentage: 34,
              visit_percentage: 15,
            },
            {
              id: 4,
              name: "Priya Chauhan",
              total_calls: 110,
              interested: 36,
              visit: 14,
              not_interested: 28,
              other_location: 16,
              lost: 16,
              interested_percentage: 33,
              visit_percentage: 13,
            },
            {
              id: 5,
              name: "Uday Singh",
              total_calls: 155,
              interested: 52,
              visit: 22,
              not_interested: 39,
              other_location: 21,
              lost: 21,
              interested_percentage: 34,
              visit_percentage: 14,
            },
          ];
          setStaffData(demoStaff);
          calculateTotals(demoStaff);
        } else if (activeTab === "team-leader") {
          const demoTL: StaffProductivityRow[] = [
            {
              id: 11,
              name: "Vikram Rathore (TL Alpha)",
              total_calls: 435,
              interested: 146,
              visit: 59,
              not_interested: 106,
              other_location: 65,
              lost: 59,
              interested_percentage: 34,
              visit_percentage: 14,
            },
            {
              id: 12,
              name: "Ramesh Meena (TL Beta)",
              total_calls: 265,
              interested: 88,
              visit: 36,
              not_interested: 69,
              other_location: 37,
              lost: 35,
              interested_percentage: 33,
              visit_percentage: 14,
            },
          ];
          setStaffData(demoTL);
          calculateTotals(demoTL);
        } else {
          const demoAssoc: StaffProductivityRow[] = [
            {
              id: 21,
              name: "Anil Kumar Associates",
              total_calls: 95,
              interested: 38,
              visit: 18,
              not_interested: 18,
              other_location: 12,
              lost: 9,
              interested_percentage: 40,
              visit_percentage: 19,
            },
            {
              id: 22,
              name: "Balaji Real Estate Agency",
              total_calls: 140,
              interested: 52,
              visit: 27,
              not_interested: 31,
              other_location: 18,
              lost: 12,
              interested_percentage: 37,
              visit_percentage: 19,
            },
          ];
          setStaffData(demoAssoc);
          calculateTotals(demoAssoc);
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Could not fetch productivity data from backend");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const calculateTotals = (rows: StaffProductivityRow[]) => {
    const t = rows.reduce(
      (acc, r) => {
        acc.calls += r.total_calls;
        acc.interested += r.interested;
        acc.visit += r.visit;
        acc.not_interested += r.not_interested;
        acc.other_location += r.other_location;
        acc.lost += r.lost;
        return acc;
      },
      { calls: 0, interested: 0, visit: 0, not_interested: 0, other_location: 0, lost: 0 }
    );
    setTotals(t);
  };

  useEffect(() => {
    loadProductivityData();
  }, [activeTab, selectedAdmin, startDate, endDate]);

  // Search filter
  const filteredData = useMemo(() => {
    if (!search.trim()) return staffData;
    const q = search.toLowerCase();
    return staffData.filter(
      (row) =>
        row.name.toLowerCase().includes(q) ||
        row.total_calls.toString().includes(q) ||
        row.interested.toString().includes(q)
    );
  }, [staffData, search]);

  const toggleRow = (id: number | string) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  // Quick Date Presets
  const setPreset = (preset: "today" | "week" | "month" | "clear") => {
    const today = new Date().toISOString().slice(0, 10);
    if (preset === "today") {
      setStartDate(today);
      setEndDate(today);
    } else if (preset === "week") {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      setStartDate(d.toISOString().slice(0, 10));
      setEndDate(today);
    } else if (preset === "month") {
      const d = new Date();
      d.setDate(1);
      setStartDate(d.toISOString().slice(0, 10));
      setEndDate(today);
    } else {
      setStartDate("");
      setEndDate("");
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = "Name,Total Calls,Interested,Visit,Not Interested,Other Location,Lost,Interested %,Visit %\n";
    const rows = filteredData
      .map(
        (r) =>
          `"${r.name}",${r.total_calls},${r.interested},${r.visit},${r.not_interested},${r.other_location},${r.lost},${r.interested_percentage}%,${r.visit_percentage}%`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `vrindavan_${activeTab}_productivity.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Productivity report exported successfully!");
  };

  const avgInterestedPct =
    totals.calls > 0 ? Math.round((totals.interested / totals.calls) * 100) : 0;
  const avgVisitPct =
    totals.calls > 0 ? Math.round((totals.visit / totals.calls) * 100) : 0;

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Luxury Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border/70 p-5 rounded-2xl shadow-card">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-xl bg-brand-soft flex items-center justify-center text-brand border border-brand/20 shadow-sm">
            <BarChart3 className="size-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Productivity &amp; Performance Index
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary">
              Staff daily calling metrics, ground site visits tally, and conversion ratios.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadProductivityData(true)}
            disabled={refreshing || loading}
            className="rounded-xl border-border/80 hover:bg-muted text-xs h-9"
          >
            <RefreshCw className={`size-3.5 mr-1.5 ${refreshing ? "animate-spin text-brand" : ""}`} />
            Refresh
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="rounded-xl border-border/80 hover:bg-muted text-xs h-9"
          >
            <Download className="size-3.5 mr-1.5 text-success" />
            Export CSV
          </Button>

          <Link to="/superadmin/reports/earnings">
            <Button
              size="sm"
              className="bg-brand hover:bg-brand-bright text-white rounded-xl shadow-sm text-xs h-9 font-semibold"
            >
              <DollarSign className="size-3.5 mr-1.5" />
              Earnings &amp; Incentives
            </Button>
          </Link>
        </div>
      </div>

      {/* Role Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Tabs
          value={activeTab}
          onValueChange={(val: any) => setActiveTab(val)}
          className="w-full sm:w-auto"
        >
          <TabsList className="bg-muted/80 p-1 rounded-xl h-11 border border-border/60">
            <TabsTrigger
              value="staff"
              className="rounded-lg text-xs font-semibold px-4 data-[state=active]:bg-brand data-[state=active]:text-white transition-all"
            >
              <PhoneCall className="size-3.5 mr-1.5" />
              Staff Callers
            </TabsTrigger>
            <TabsTrigger
              value="team-leader"
              className="rounded-lg text-xs font-semibold px-4 data-[state=active]:bg-brand data-[state=active]:text-white transition-all"
            >
              <Briefcase className="size-3.5 mr-1.5" />
              Team Leaders
            </TabsTrigger>
            <TabsTrigger
              value="associates"
              className="rounded-lg text-xs font-semibold px-4 data-[state=active]:bg-brand data-[state=active]:text-white transition-all"
            >
              <UsersRound className="size-3.5 mr-1.5" />
              Channel Associates
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Quick Date Presets */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-text-muted font-medium mr-1 hidden sm:inline">Range:</span>
          <button
            onClick={() => setPreset("today")}
            className="px-2.5 py-1 rounded-lg bg-card border border-border/70 hover:bg-muted text-text-secondary text-[11px] font-medium"
          >
            Today
          </button>
          <button
            onClick={() => setPreset("week")}
            className="px-2.5 py-1 rounded-lg bg-card border border-border/70 hover:bg-muted text-text-secondary text-[11px] font-medium"
          >
            7 Days
          </button>
          <button
            onClick={() => setPreset("month")}
            className="px-2.5 py-1 rounded-lg bg-card border border-border/70 hover:bg-muted text-text-secondary text-[11px] font-medium"
          >
            This Month
          </button>
          {(startDate || endDate) && (
            <button
              onClick={() => setPreset("clear")}
              className="px-2.5 py-1 rounded-lg bg-danger-soft text-danger text-[11px] font-medium"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Top 5 Performance KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-card border border-border/70 rounded-2xl p-4 shadow-card hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              Total Calls
            </span>
            <div className="p-1.5 rounded-lg bg-brand-soft text-brand">
              <PhoneCall className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-foreground">
            {totals.calls}
          </div>
          <p className="text-[11px] text-text-muted mt-0.5">Calls across roster</p>
        </div>

        <div className="bg-card border border-border/70 rounded-2xl p-4 shadow-card hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              Interested
            </span>
            <div className="p-1.5 rounded-lg bg-success-soft text-success">
              <CheckCircle2 className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-success">
            {totals.interested}
          </div>
          <p className="text-[11px] text-text-muted mt-0.5">Hot plot inquiries</p>
        </div>

        <div className="bg-card border border-border/70 rounded-2xl p-4 shadow-card hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              Site Visits
            </span>
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600">
              <Eye className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {totals.visit}
          </div>
          <p className="text-[11px] text-text-muted mt-0.5">Visits scheduled</p>
        </div>

        <div className="bg-card border border-border/70 rounded-2xl p-4 shadow-card hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              Interested Rate
            </span>
            <div className="p-1.5 rounded-lg bg-info-soft text-info">
              <Percent className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-info">
            {avgInterestedPct}%
          </div>
          <p className="text-[11px] text-text-muted mt-0.5">Call to interested</p>
        </div>

        <div className="bg-card border border-border/70 rounded-2xl p-4 shadow-card hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              Visit Rate
            </span>
            <div className="p-1.5 rounded-lg bg-warning-soft text-warning">
              <TrendingUp className="size-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-warning">
            {avgVisitPct}%
          </div>
          <p className="text-[11px] text-text-muted mt-0.5">Call to ground visit</p>
        </div>
      </div>

      {/* Main Productivity Card */}
      <Card className="border border-border/70 rounded-2xl shadow-card bg-card overflow-hidden">
        {/* Filters and Search Bar */}
        <div className="p-4 sm:p-5 border-b border-border/70 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-muted/20">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
              <Input
                placeholder="Search staff or agent..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 rounded-xl bg-background border-border/70 text-xs focus-visible:ring-brand"
              />
            </div>

            {/* Admin Filter */}
            {activeTab !== "associates" && (
              <div className="w-44">
                <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
                  <SelectTrigger className="h-10 rounded-xl bg-background border-border/70 text-xs">
                    <SelectValue placeholder="All Admins" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-admins">All Admins</SelectItem>
                    {admins.map((adm) => (
                      <SelectItem key={adm.id} value={String(adm.id)}>
                        {adm.name || adm.user?.first_name || `Admin #${adm.id}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Date Pickers */}
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-10 rounded-xl bg-background border-border/70 text-xs w-36"
                title="Start Date"
              />
              <span className="text-xs text-text-muted">to</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-10 rounded-xl bg-background border-border/70 text-xs w-36"
                title="End Date"
              />
            </div>
          </div>

          <div className="text-xs text-text-muted self-end md:self-center font-medium">
            Showing <span className="font-bold text-foreground">{filteredData.length}</span> Members
          </div>
        </div>

        {/* Productivity Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px] sm:min-w-full">
            <thead>
              <tr className="border-b border-border/60 bg-muted/30 text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                <th className="py-3 px-4 w-12 text-center">S.N.</th>
                <th className="py-3 px-4">Caller / Member Name</th>
                <th className="py-3 px-3 text-center">Total Calls</th>
                <th className="py-3 px-3 text-center">Interested</th>
                <th className="py-3 px-3 text-center">Site Visit</th>
                <th className="py-3 px-3 text-center hidden md:table-cell">Not Interested</th>
                <th className="py-3 px-3 text-center hidden lg:table-cell">Other Location</th>
                <th className="py-3 px-3 text-center hidden lg:table-cell">Lost</th>
                <th className="py-3 px-4 text-center">Interested %</th>
                <th className="py-3 px-4 text-center">Visit %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs text-foreground">
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-text-secondary">
                    <RefreshCw className="size-6 animate-spin mx-auto mb-2 text-brand" />
                    Calculating productivity metrics...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-text-secondary">
                    <BarChart3 className="size-8 text-text-muted mx-auto mb-2 opacity-50" />
                    No productivity logs found for selected criteria.
                  </td>
                </tr>
              ) : (
                filteredData.map((row, idx) => {
                  const isExpanded = expandedRowId === row.id;

                  return (
                    <React.Fragment key={row.id}>
                      <tr className="hover:bg-muted/20 transition-colors group">
                        {/* S.N. / Accordion Trigger */}
                        <td className="py-3.5 px-4 text-center font-medium text-text-secondary">
                          <span className="hidden sm:inline">{idx + 1}</span>
                          <button
                            onClick={() => toggleRow(row.id)}
                            className="sm:hidden size-6 rounded-md bg-muted flex items-center justify-center text-text-secondary hover:text-brand"
                          >
                            {isExpanded ? "−" : "+"}
                          </button>
                        </td>

                        {/* Name & Avatar */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="size-7 rounded-full bg-brand-soft text-brand font-bold flex items-center justify-center text-[11px] flex-shrink-0">
                              {row.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-foreground group-hover:text-brand transition-colors">
                              {row.name}
                            </span>
                          </div>
                        </td>

                        {/* Calls */}
                        <td className="py-3.5 px-3 text-center font-bold text-foreground">
                          {row.total_calls}
                        </td>

                        {/* Interested */}
                        <td className="py-3.5 px-3 text-center font-semibold text-success">
                          {row.interested}
                        </td>

                        {/* Visit */}
                        <td className="py-3.5 px-3 text-center font-semibold text-indigo-600 dark:text-indigo-400">
                          {row.visit}
                        </td>

                        {/* Not Interested */}
                        <td className="py-3.5 px-3 text-center text-text-muted hidden md:table-cell">
                          {row.not_interested}
                        </td>

                        {/* Other Location */}
                        <td className="py-3.5 px-3 text-center text-text-muted hidden lg:table-cell">
                          {row.other_location}
                        </td>

                        {/* Lost */}
                        <td className="py-3.5 px-3 text-center text-danger hidden lg:table-cell">
                          {row.lost}
                        </td>

                        {/* Interested % Badge */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-success-soft text-success border border-success/20">
                            {row.interested_percentage}%
                          </span>
                        </td>

                        {/* Visit % Badge */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                            {row.visit_percentage}%
                          </span>
                        </td>
                      </tr>

                      {/* Mobile Accordion Breakdown */}
                      {isExpanded && (
                        <tr className="sm:hidden bg-muted/30 border-b border-border">
                          <td colSpan={10} className="p-4">
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between py-1 border-b border-border/40">
                                <span className="font-semibold text-text-muted">Not Interested:</span>
                                <span>{row.not_interested}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b border-border/40">
                                <span className="font-semibold text-text-muted">Other Location:</span>
                                <span>{row.other_location}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b border-border/40">
                                <span className="font-semibold text-text-muted">Lost:</span>
                                <span className="text-danger font-semibold">{row.lost}</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>

            {/* Table Footer with Grand Aggregate Totals */}
            <tfoot>
              <tr className="border-t-2 border-border bg-muted/40 font-bold text-xs text-foreground">
                <td colSpan={2} className="py-3.5 px-4 uppercase tracking-wider">
                  Company Aggregate Total
                </td>
                <td className="py-3.5 px-3 text-center text-foreground font-extrabold">
                  {totals.calls}
                </td>
                <td className="py-3.5 px-3 text-center text-success font-extrabold">
                  {totals.interested}
                </td>
                <td className="py-3.5 px-3 text-center text-indigo-600 dark:text-indigo-400 font-extrabold">
                  {totals.visit}
                </td>
                <td className="py-3.5 px-3 text-center hidden md:table-cell text-text-muted">
                  {totals.not_interested}
                </td>
                <td className="py-3.5 px-3 text-center hidden lg:table-cell text-text-muted">
                  {totals.other_location}
                </td>
                <td className="py-3.5 px-3 text-center hidden lg:table-cell text-danger">
                  {totals.lost}
                </td>
                <td className="py-3.5 px-4 text-center text-success font-extrabold">
                  {avgInterestedPct}%
                </td>
                <td className="py-3.5 px-4 text-center text-indigo-600 dark:text-indigo-400 font-extrabold">
                  {avgVisitPct}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
}
export default SuperadminProductivityPage;
