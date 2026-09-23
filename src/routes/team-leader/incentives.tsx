import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { DollarSign, Filter, Loader2, Minus, Plus, IndianRupee, Layers, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  fetchTeamLeaderStaffDashboard,
  fetchTeamLeaderStaffIncentives,
  SellProperty,
  Slab,
  TeamLeaderStaff,
} from "@/lib/services/team-leader";

export const Route = createFileRoute("/team-leader/incentives")({
  head: () => ({
    meta: [
      { title: "Staff Incentives & Slabs | Team Leader Portal" },
      { name: "description", content: "Inspect telecaller incentive slabs, plot sales, and commissions." },
    ],
  }),
  component: TeamLeaderIncentivesPage,
});

export function TeamLeaderIncentivesPage() {
  const [sellProperties, setSellProperties] = useState<SellProperty[]>([]);
  const [slabs, setSlabs] = useState<Slab[]>([]);
  const [totalEarn, setTotalEarn] = useState(0);
  const [currentSlab, setCurrentSlab] = useState<Slab | null>(null);
  const [incentiveAmount, setIncentiveAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [staffId, setStaffId] = useState<string>("");
  const [staffList, setStaffList] = useState<TeamLeaderStaff[]>([]);

  const monthsList = [
    [1, "January"],
    [2, "February"],
    [3, "March"],
    [4, "April"],
    [5, "May"],
    [6, "June"],
    [7, "July"],
    [8, "August"],
    [9, "September"],
    [10, "October"],
    [11, "November"],
    [12, "December"],
  ];

  const yearsList = Array.from({ length: 7 }, (_, i) => new Date().getFullYear() - 3 + i);

  async function loadStaffs() {
    try {
      const data = await fetchTeamLeaderStaffDashboard();
      const list = data.staff_list || [];
      setStaffList(list);
      if (list.length > 0 && list[0] && !staffId) {
        setStaffId(String(list[0].id));
      }
    } catch {
      const fallback = [
        { id: 1, username: "Neha Sharma", email: "neha.sharma@vrindavan.com", mobile: "9829011223", created_date: "" },
        { id: 2, username: "Rahul Verma", email: "rahul.verma@vrindavan.com", mobile: "9829044556", created_date: "" },
      ];
      setStaffList(fallback);
      setStaffId("1");
    }
  }

  async function loadIncentives(sId = staffId, y = year, m = month) {
    if (!sId) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchTeamLeaderStaffIncentives(sId, y, m);
      setSellProperties(data.sell_property || []);
      setSlabs(data.slab || []);
      setTotalEarn(data.total_earn || 0);

      // Find active slab based on total_earn
      const active = (data.slab || []).find((s) => {
        const start = parseFloat(s.start_value);
        const end = parseFloat(s.end_value);
        const earned = data.total_earn || 0;
        return earned >= start && (end === 0 || earned <= end);
      });
      setCurrentSlab(active || null);
      if (active) {
        setIncentiveAmount(parseFloat(active.amount || active.flat_percent || "0"));
      } else {
        setIncentiveAmount(0);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load incentive data.");
      toast.error(err.message || "Failed to load incentives");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStaffs();
  }, []);

  useEffect(() => {
    if (staffId) {
      loadIncentives(staffId, year, month);
    }
  }, [staffId, year, month]);

  const toggleRow = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <IndianRupee className="size-6 text-[#6732F2]" />
            Staff Incentives &amp; Slabs
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            View telecaller plot sale commissions, active milestone slabs, and monthly incentive credits.
          </p>
        </div>
      </div>

      {/* Filter Card */}
      <Card className="border rounded-xl bg-white shadow-xs">
        <CardContent className="p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Select Staff</label>
              <Select value={staffId} onValueChange={(val) => setStaffId(val)}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Select Staff" />
                </SelectTrigger>
                <SelectContent>
                  {staffList.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)} className="text-xs">
                      {s.username || s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Month</label>
              <Select value={String(month)} onValueChange={(val) => setMonth(Number(val))}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {monthsList.map(([num, mName]) => (
                    <SelectItem key={num} value={String(num)} className="text-xs">
                      {mName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600">Year</label>
              <Select value={String(year)} onValueChange={(val) => setYear(Number(val))}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {yearsList.map((y) => (
                    <SelectItem key={y} value={String(y)} className="text-xs">
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button
                onClick={() => loadIncentives(staffId, year, month)}
                disabled={loading}
                size="sm"
                className="h-9 text-xs bg-[#6732F2] hover:bg-[#5524cf] text-white font-medium flex items-center justify-center gap-1.5 w-full"
              >
                {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Filter className="size-3.5" />}
                Filter Slabs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Slabs Section */}
      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <CardHeader className="p-3 sm:p-4 border-b">
          <CardTitle className="text-sm sm:text-base font-bold text-gray-900">
            Incentive Slabs Tier
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            Available slab tiers and threshold requirements. Current achieved slab is highlighted.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 text-[11px] font-semibold text-gray-600 uppercase">
                  <TableHead className="w-1/3">Slab Tier</TableHead>
                  <TableHead className="w-1/3">Turnover Range (₹ Min - Max)</TableHead>
                  <TableHead className="w-1/3 text-right">Incentive Reward</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slabs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-20 text-center text-xs text-gray-500">
                      No incentive slabs configured.
                    </TableCell>
                  </TableRow>
                ) : (
                  slabs.map((slab) => {
                    const isCurrent = currentSlab?.id === slab.id;
                    const startVal = parseFloat(slab.start_value).toLocaleString();
                    const endVal = parseFloat(slab.end_value) === 0 ? "No Limit" : `₹${parseFloat(slab.end_value).toLocaleString()}`;
                    return (
                      <TableRow
                        key={slab.id}
                        className={cn(
                          "text-xs hover:bg-gray-50/70",
                          isCurrent && "bg-emerald-50/70 font-semibold"
                        )}
                      >
                        <TableCell className="font-semibold text-gray-900">
                          <div className="flex items-center gap-2">
                            <span>Slab #{slab.id}</span>
                            {isCurrent && (
                              <Badge className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0 border-emerald-300">
                                Current Achieved
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">
                          ₹{startVal} - {endVal}
                        </TableCell>
                        <TableCell className="text-right font-bold text-emerald-600">
                          ₹{parseFloat(slab.amount).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Plan Details Table */}
      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <CardHeader className="p-3 sm:p-4 border-b flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm sm:text-base font-bold text-gray-900">
              Incentive Plot Sales Plan ({sellProperties.length})
            </CardTitle>
            <CardDescription className="text-xs text-gray-500">
              Verified sold plots and commission credits recorded for this billing cycle.
            </CardDescription>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-500">Total Incentive:</span>{" "}
            <span className="text-base font-extrabold text-emerald-600">
              ₹{incentiveAmount.toLocaleString()}
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 text-[11px] font-semibold text-gray-600 uppercase">
                  <TableHead className="w-12 text-center">S.N.</TableHead>
                  <TableHead>Booking Date</TableHead>
                  <TableHead>Project / Plot</TableHead>
                  <TableHead>Size (Gaj)</TableHead>
                  <TableHead className="text-right">Sale Amount</TableHead>
                  <TableHead className="text-right">Earning Credit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sellProperties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-xs text-gray-500">
                      No plots sold in this selected period.
                    </TableCell>
                  </TableRow>
                ) : (
                  sellProperties.map((prop, idx) => (
                    <TableRow key={prop.id} className="text-xs hover:bg-gray-50/70">
                      <TableCell className="text-center font-medium">{idx + 1}.</TableCell>
                      <TableCell className="font-mono text-gray-600">
                        {new Date(prop.created_date).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell className="font-semibold text-gray-900">
                        {prop.property_name} <span className="text-gray-500 font-normal">({prop.plot_no || "N/A"})</span>
                      </TableCell>
                      <TableCell className="text-gray-700">{prop.size_in_gaj || "N/A"} Gaj</TableCell>
                      <TableCell className="text-right font-semibold text-gray-900">
                        ₹{(prop.amount || 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-bold text-emerald-600">
                        ₹{(prop.earn_amount || 0).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
