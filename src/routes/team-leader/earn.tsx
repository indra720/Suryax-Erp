import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Calendar, DollarSign, Filter, Loader2, Sparkles, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  fetchTeamLeaderStaffDashboard,
  fetchTeamLeaderStaffCalendar,
  DayData,
  TeamLeaderStaff,
} from "@/lib/services/team-leader";

export const Route = createFileRoute("/team-leader/earn")({
  head: () => ({
    meta: [
      { title: "Staff Earn Calendar | Team Leader Portal" },
      { name: "description", content: "Daily calling productivity and earn calendar for team staff." },
    ],
  }),
  component: TeamLeaderEarnPage,
});

export function TeamLeaderEarnPage() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState<DayData[]>([]);
  const [staffData, setStaffData] = useState<{ name?: string; email?: string; mobile?: string } | null>(null);
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  async function loadStaffList() {
    try {
      const data = await fetchTeamLeaderStaffDashboard();
      const list = data.staff_list || [];
      setStaffList(list);
      if (list.length > 0 && list[0] && !staffId) {
        setStaffId(String(list[0].id));
      }
    } catch {
      // Fallback staff
      const fallback = [
        { id: 1, username: "Neha Sharma", email: "neha.sharma@vrindavan.com", mobile: "9829011223", created_date: "" },
        { id: 2, username: "Rahul Verma", email: "rahul.verma@vrindavan.com", mobile: "9829044556", created_date: "" },
      ];
      setStaffList(fallback);
      setStaffId("1");
    }
  }

  async function loadCalendar(id = staffId, y = year, m = month) {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const data = await fetchTeamLeaderStaffCalendar(id, y, m);
      setCalendarData(data.calendar_data || []);
      setStaffData({
        name: data.staff_details?.username || "",
        email: data.staff_details?.email || "",
        mobile: data.staff_details?.mobile || "",
      });
      setMonthlySalary(data.monthly_salary || 0);
      setTotalSalary(data.earn_salary || data.total_salary || 0);
    } catch (err: any) {
      setError(err.message || "Failed to fetch calendar data");
      toast.error(err.message || "Failed to load earn calendar.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStaffList();
  }, []);

  useEffect(() => {
    if (staffId) {
      loadCalendar(staffId, year, month);
    }
  }, [staffId, year, month]);

  function getCellBgColor(leads?: number) {
    if (leads === undefined || leads === 0) return "bg-gray-50 border border-gray-200 text-gray-500";
    if (leads >= 15) return "bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-xs";
    if (leads >= 10) return "bg-gradient-to-tr from-purple-500 to-indigo-400 text-white shadow-xs";
    if (leads >= 5) return "bg-gradient-to-tr from-purple-200 to-indigo-200 text-gray-800";
    return "bg-gradient-to-tr from-purple-100 to-indigo-100 text-gray-700";
  }

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Calendar className="size-6 text-[#6732F2]" />
            Staff Earn Calendar
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            View daily calling lead counts, verified productivity earnings, and monthly payouts per staff.
          </p>
        </div>
      </div>

      {/* Filter Card */}
      <Card className="border rounded-xl bg-white shadow-xs">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-64 space-y-1">
              <label className="text-xs font-semibold text-gray-600">Select Staff</label>
              <Select value={staffId} onValueChange={(val) => setStaffId(val)}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Select Staff" />
                </SelectTrigger>
                <SelectContent>
                  {staffList.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)} className="text-xs">
                      {s.username || s.name} ({s.email || s.mobile})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-44 space-y-1">
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

            <div className="w-full sm:w-32 space-y-1">
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

            <div className="w-full sm:w-auto pt-5">
              <Button
                onClick={() => loadCalendar(staffId, year, month)}
                disabled={loading}
                size="sm"
                className="h-9 text-xs bg-[#6732F2] hover:bg-[#5524cf] text-white font-medium flex items-center gap-1.5 w-full sm:w-auto"
              >
                {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Filter className="size-3.5" />}
                Filter Calendar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Calendar View */}
      <Card className="border rounded-xl bg-white shadow-xs p-3 sm:p-5">
        {staffData?.name && (
          <div className="mb-4 pb-3 border-b flex flex-wrap items-center justify-between gap-2 text-xs">
            <div>
              <span className="font-semibold text-gray-500">Staff Member:</span>{" "}
              <span className="font-bold text-gray-900 text-sm">{staffData.name}</span>{" "}
              <span className="text-gray-500 font-mono">({staffData.email || staffData.mobile})</span>
            </div>
            <div className="text-xs text-gray-500">
              Showing {monthsList.find(([m]) => m === month)?.[1]} {year}
            </div>
          </div>
        )}

        {/* Performance Legend */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border text-xs">
          <p className="font-semibold text-gray-700 mb-2">Performance & Calling Legend:</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <div className="flex items-center gap-2">
              <div className="size-3.5 bg-gray-100 border border-gray-300 rounded" />
              <span className="text-gray-600">0 Leads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3.5 bg-gradient-to-tr from-purple-100 to-indigo-100 rounded" />
              <span className="text-gray-600">1 - 4 Leads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3.5 bg-gradient-to-tr from-purple-200 to-indigo-200 rounded" />
              <span className="text-gray-600">5 - 9 Leads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3.5 bg-gradient-to-tr from-purple-500 to-indigo-400 rounded" />
              <span className="text-gray-600">10 - 14 Leads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3.5 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded" />
              <span className="text-gray-600 font-semibold">15+ Leads 🔥</span>
            </div>
          </div>
        </div>

        {/* Days Header */}
        <div className="hidden md:grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-gray-500 uppercase">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid on Desktop */}
        <div className="hidden md:grid grid-cols-7 gap-2">
          {calendarData.map((d, index) => {
            const bg = getCellBgColor(d.leads);
            return (
              <div
                key={index}
                className={cn(
                  "p-2.5 h-24 flex flex-col justify-between rounded-lg transition-transform hover:scale-[1.02]",
                  bg
                )}
              >
                <div className="text-right font-extrabold text-sm">{d.day}</div>
                <div className="text-xs space-y-0.5">
                  <div className="font-semibold">Leads: {d.leads}</div>
                  <div className="text-[11px]">Earn: ₹{d.salary.toLocaleString()}</div>
                </div>
                {d.leads > 0 && (
                  <div className="text-[10px] opacity-80">
                    {d.leads >= 15 ? "🔥 Excellent" : d.leads >= 10 ? "✨ Great" : d.leads >= 5 ? "👍 Good" : "📈 Active"}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Table View on Mobile */}
        <div className="md:hidden overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 text-[11px] font-semibold text-gray-600">
                <TableHead>Date</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead className="text-right">Earn</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calendarData.map((d, index) => (
                <TableRow key={index} className="text-xs">
                  <TableCell className="font-medium">{d.day}</TableCell>
                  <TableCell>{d.day_name}</TableCell>
                  <TableCell className="font-semibold">{d.leads}</TableCell>
                  <TableCell className="text-right text-emerald-600 font-bold">
                    ₹{d.salary.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Bottom Salary Summary */}
        <div className="mt-5 p-3.5 bg-purple-50/60 rounded-xl border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="font-medium text-gray-700">
            Monthly Base Salary: <span className="font-bold text-gray-900">₹{monthlySalary.toLocaleString()}</span>
          </div>
          <div className="font-medium text-gray-700">
            Total Earned This Month:{" "}
            <span className="font-extrabold text-[#6732F2] text-base sm:text-lg">
              ₹{totalSalary.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
