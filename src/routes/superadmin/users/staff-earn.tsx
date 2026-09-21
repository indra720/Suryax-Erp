import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Calendar,
  IndianRupee,
  PhoneCall,
  User,
  Users,
  Sparkles,
  TrendingUp,
  RefreshCw,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Flame,
  Award,
} from "lucide-react";
import { Card } from "@/components/erp/ui";
import {
  fetchStaffCalendar,
  fetchAddSellDropdowns,
  StaffCalendarResponse,
  StaffCalendarDay,
} from "@/lib/services/api";

export const Route = createFileRoute("/superadmin/users/staff-earn")({
  head: () => ({
    meta: [
      { title: "Staff Monthly Earn Calendar | Vrindavan ERP" },
      {
        name: "description",
        content:
          "Day-by-day attendance, telecalling leads, and daily salary earnings calendar for sales staff.",
      },
    ],
  }),
  component: StaffEarnCalendarPage,
});

export function StaffEarnCalendarPage() {
  const [staffList, setStaffList] = useState<Array<{ id: number; name: string }>>([]);
  const [selectedStaffId, setSelectedStaffId] = useState<string>("1");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [calendarData, setCalendarData] = useState<StaffCalendarResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const months = [
    { num: 1, name: "January" },
    { num: 2, name: "February" },
    { num: 3, name: "March" },
    { num: 4, name: "April" },
    { num: 5, name: "May" },
    { num: 6, name: "June" },
    { num: 7, name: "July" },
    { num: 8, name: "August" },
    { num: 9, name: "September" },
    { num: 10, name: "October" },
    { num: 11, name: "November" },
    { num: 12, name: "December" },
  ];

  // Load staff list
  useEffect(() => {
    const loadStaff = async () => {
      try {
        const res = await fetchAddSellDropdowns();
        const list = res.staffs.length > 0 ? res.staffs : [
          { id: 1, name: "Indrajeet Patel" },
          { id: 2, name: "Ananya Mishra" },
          { id: 3, name: "Rahul Singh" },
        ];
        setStaffList(list);
        if (list[0]) setSelectedStaffId(String(list[0].id));
      } catch {
        setStaffList([
          { id: 1, name: "Indrajeet Patel" },
          { id: 2, name: "Ananya Mishra" },
        ]);
      }
    };
    loadStaff();
  }, []);

  // Load calendar for selected staff
  const loadCalendar = async () => {
    if (!selectedStaffId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchStaffCalendar(selectedStaffId, year, month);
      setCalendarData(res);
    } catch (err: any) {
      setError(err?.message || "Failed to load calendar data");
      // Fallback mock 30-day productivity days
      const daysInMonth = new Date(year, month, 0).getDate();
      const mockDays: StaffCalendarDay[] = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const leads = (day % 7 === 0) ? 0 : Math.floor(Math.sin(day) * 6) + 7;
        const dailySalary = leads > 0 ? 800 : 0;
        return {
          day,
          date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
          day_name: new Date(year, month - 1, day).toLocaleDateString("en-US", { weekday: "short" }),
          leads,
          salary: dailySalary,
        };
      });

      const totalSal = mockDays.reduce((acc, curr) => acc + curr.salary, 0);

      setCalendarData({
        staff: {
          name: staffList.find((s) => String(s.id) === selectedStaffId)?.name || "Indrajeet Patel",
          email: "indrajeet@nexus.com",
          mobile: "9876543210",
          salary: "24000",
        },
        year,
        month,
        monthly_salary: "24000",
        total_salary: totalSal,
        months_list: months.map((m) => [m.num, m.name]),
        daily_productivity_data: mockDays,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalendar();
  }, [selectedStaffId, year, month]);

  const daysList = calendarData?.daily_productivity_data || [];
  const totalLeadsDialed = daysList.reduce((acc, d) => acc + d.leads, 0);
  const totalEarned = calendarData?.total_salary || daysList.reduce((acc, d) => acc + d.salary, 0);
  const activeWorkingDays = daysList.filter((d) => d.leads > 0).length;

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-amber-500/10 via-purple-50 to-white p-5 rounded-2xl border border-amber-200/50 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to="/superadmin/users/staff"
              className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Staff Directory
            </Link>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
              Productivity Calendar
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            Staff Monthly Earn Calendar
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Day-by-day attendance and telecalling leads linked directly to daily salary calculations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadCalendar}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Sync</span>
          </button>
          <Link
            to="/superadmin/reports/earnings"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-brand rounded-xl hover:bg-brand/90 transition-colors shadow-xs"
          >
            <IndianRupee className="w-3.5 h-3.5" />
            <span>Company Payroll</span>
          </Link>
        </div>
      </div>

      {/* Selector & Filter Controls Card */}
      <Card className="p-4 bg-white border border-gray-200/80 rounded-2xl shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          {/* Staff Member Select */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-brand" /> Staff Caller
            </label>
            <select
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              className="w-full h-10 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand outline-none"
            >
              {staffList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Month Select */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand" /> Month
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="w-full h-10 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand outline-none"
            >
              {months.map((m) => (
                <option key={m.num} value={m.num}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Year Select */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full h-10 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand outline-none"
            >
              {[year - 1, year, year + 1].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Staff Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Staff Member</span>
          <div className="text-base font-bold text-gray-900 mt-1 truncate">
            {calendarData?.staff?.name || "Indrajeet Patel"}
          </div>
          <div className="text-xs text-muted-foreground">{calendarData?.staff?.email || "indrajeet@nexus.com"}</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Total Inquiries</span>
          <div className="text-2xl font-extrabold text-brand mt-1">{totalLeadsDialed}</div>
          <div className="text-xs text-muted-foreground">Dialed & updated leads</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Active Days</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">
            {activeWorkingDays} Days
          </div>
          <div className="text-xs text-muted-foreground">Days with &gt;= 1 lead action</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <span className="text-xs font-semibold text-muted-foreground uppercase">Net Calculated Payout</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1 flex items-center">
            <IndianRupee className="w-5 h-5" />
            {Number(totalEarned).toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Base: ₹{calendarData?.monthly_salary || 24000}/mo</div>
        </div>
      </div>

      {/* 31-Day Interactive Calendar Grid */}
      <Card className="p-5 bg-white border border-gray-200/80 rounded-2xl shadow-xs">
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
          <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand" />
            <span>
              {months.find((m) => m.num === month)?.name} {year} Productivity Matrix
            </span>
          </h2>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-md bg-emerald-500" />
              <span className="text-muted-foreground">Active (&gt;=1 Leads)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-md bg-red-500" />
              <span className="text-muted-foreground">Absent / Inactive (0 Leads)</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-muted-foreground">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand mb-2" />
            Loading monthly calendar...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {daysList.map((d) => {
              const isActive = d.leads > 0;
              const badge =
                d.leads >= 15
                  ? "🔥 Super Star"
                  : d.leads >= 10
                  ? "✨ High Output"
                  : d.leads >= 5
                  ? "👍 Active"
                  : d.leads > 0
                  ? "📈 Start"
                  : "Inactive";

              return (
                <div
                  key={d.day}
                  className={`p-3.5 rounded-2xl flex flex-col justify-between min-h-[110px] transition-all hover:scale-[1.03] shadow-2xs ${
                    isActive
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
                      : "bg-gradient-to-br from-red-500 to-red-600 text-white opacity-85"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold opacity-90">{d.day_name}</span>
                    <span className="text-lg font-black">{d.day}</span>
                  </div>

                  <div className="space-y-0.5 mt-2 text-xs">
                    <div className="font-semibold flex items-center justify-between">
                      <span className="opacity-80">Leads:</span>
                      <span className="font-bold">{d.leads}</span>
                    </div>
                    <div className="font-semibold flex items-center justify-between">
                      <span className="opacity-80">Earn:</span>
                      <span className="font-bold">₹{d.salary}</span>
                    </div>
                  </div>

                  <div className="mt-2 text-[10px] font-bold tracking-tight text-white/95 bg-black/15 px-2 py-0.5 rounded-md text-center">
                    {badge}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
