import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Loader2, Calendar, IndianRupee, TrendingUp, AlertCircle, PhoneCall, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { fetchStaffEarnCalendar, type StaffCalendarDay, type StaffEarnData } from "@/lib/services/staff";

export const Route = createFileRoute("/staff/earn")({
  head: () => ({
    meta: [
      { title: "My Attendance & Salary Earn Calendar | Vrindavan ERP Staff" },
      { name: "description", content: "Daily calling performance, attendance records, and earned salary calendar." },
    ],
  }),
  component: StaffEarnCalendarPage,
});

export function StaffEarnCalendarPage() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendarData, setCalendarData] = useState<StaffCalendarDay[]>([]);
  const [staffData, setStaffData] = useState<{ name: string; email: string; mobile: string } | null>(null);
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const yearsList = Array.from({ length: 6 }, (_, i) => new Date().getFullYear() - 2 + i);
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  async function loadCalendar(y = year, m = month) {
    setLoading(true);
    setError("");
    try {
      const data: StaffEarnData = await fetchStaffEarnCalendar(y, m);
      setCalendarData(data.calendar_data || []);
      if (data.staff_details) {
        setStaffData({
          name: data.staff_details.username,
          email: data.staff_details.email,
          mobile: data.staff_details.mobile,
        });
      }
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
    loadCalendar(year, month);
  }, [year, month]);

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const getDayColor = (leads: number, isSunday: boolean) => {
    if (isSunday) return "bg-gray-100 border-gray-200 text-gray-400";
    if (leads >= 10) return "bg-emerald-50 border-emerald-300 text-emerald-900";
    if (leads >= 5) return "bg-blue-50 border-blue-300 text-blue-900";
    if (leads > 0) return "bg-amber-50 border-amber-300 text-amber-900";
    return "bg-rose-50 border-rose-200 text-rose-700";
  };

  const currentMonthName = months.find((m) => m.value === month)?.label || "";

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header with Monthly Financial Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="border-l-4 border-l-primary bg-card/60 shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Monthly Base Salary</p>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mt-0.5">
                  ₹{monthlySalary.toLocaleString()}
                </h3>
              </div>
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <IndianRupee className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-card/60 shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Earned This Month</p>
                <h3 className="text-lg sm:text-xl font-bold text-emerald-700 mt-0.5">
                  ₹{totalSalary.toLocaleString()}
                </h3>
              </div>
              <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 bg-card/60 shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Selected Month</p>
                <h3 className="text-base sm:text-lg font-bold text-foreground mt-0.5">
                  {currentMonthName} {year}
                </h3>
              </div>
              <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Calendar Card */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
          <div>
            <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Calling Performance & Attendance Calendar
            </CardTitle>
            <CardDescription className="text-xs">
              Daily calling volume, attendance status, and daily salary credited.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Select value={String(month)} onValueChange={(val) => setMonth(Number(val))}>
              <SelectTrigger className="w-[125px] h-8 text-xs">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m.value} value={String(m.value)} className="text-xs">
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={String(year)} onValueChange={(val) => setYear(Number(val))}>
              <SelectTrigger className="w-[90px] h-8 text-xs">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {yearsList.map((y) => (
                  <SelectItem key={y} value={String(y)} className="text-xs">
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Performance Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs mb-4 p-2 bg-muted/40 rounded-lg border">
            <span className="font-semibold text-text-muted">Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block" />
              <span>High Activity (10+ calls)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-blue-500 inline-block" />
              <span>Moderate (5-9 calls)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
              <span>Low (1-4 calls)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-400 inline-block" />
              <span>Zero / Absent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-gray-300 inline-block" />
              <span>Sunday</span>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-xs">Loading attendance and earn data...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12 text-rose-500 gap-2">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {calendarData.map((item) => {
                const isSunday = item.day_name === "Sun";
                return (
                  <div
                    key={item.day}
                    className={cn(
                      "p-2.5 rounded-lg border transition-all duration-150 flex flex-col justify-between min-h-[90px]",
                      getDayColor(item.leads, isSunday)
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{item.day}</span>
                      <span className="text-[11px] uppercase tracking-wider font-semibold opacity-75">
                        {item.day_name}
                      </span>
                    </div>

                    <div className="my-1.5">
                      <div className="flex items-center gap-1 text-xs">
                        <PhoneCall className="h-3 w-3 opacity-70" />
                        <span className="font-semibold">{item.leads}</span>
                        <span className="text-[10px] opacity-75">leads</span>
                      </div>
                    </div>

                    <div className="pt-1 border-t border-black/10 flex items-center justify-between text-[11px] font-bold">
                      <span>Salary:</span>
                      <span>₹{item.salary}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
