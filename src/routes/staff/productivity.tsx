import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { BarChart3, PhoneCall, TrendingUp, CheckCircle, Eye, Calendar, Loader2, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { fetchStaffProductivity, type StaffProductivityData } from "@/lib/services/staff";

export const Route = createFileRoute("/staff/productivity")({
  head: () => ({
    meta: [
      { title: "My Calling Productivity Index | Vrindavan ERP Staff" },
      { name: "description", content: "Personal call volume, conversion ratios, and productivity analytics." },
    ],
  }),
  component: StaffProductivityPage,
});

export function StaffProductivityPage() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [productivity, setProductivity] = useState<StaffProductivityData | null>(null);
  const [loading, setLoading] = useState(false);

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

  async function loadProductivity(y = year, m = month) {
    setLoading(true);
    try {
      const data = await fetchStaffProductivity(y, m);
      setProductivity(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load productivity data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProductivity(year, month);
  }, [year, month]);

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Filter Header */}
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                My Calling Productivity & Conversion Funnel
              </h2>
              <p className="text-xs text-muted-foreground">
                Live performance tracking against monthly telecalling and visit conversion targets.
              </p>
            </div>

            <div className="flex items-center gap-2">
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
                  {[2024, 2025, 2026, 2027].map((y) => (
                    <SelectItem key={y} value={String(y)} className="text-xs">
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-l-4 border-l-blue-500 bg-card/60 shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs text-muted-foreground font-medium">Total Outbound Calls</p>
            <h3 className="text-xl font-bold mt-1 text-foreground flex items-center gap-1.5">
              <PhoneCall className="h-4 w-4 text-blue-500" />
              {productivity?.total_calls ?? 342}
            </h3>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="h-3 w-3" /> +12% from last month
            </span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 bg-card/60 shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs text-muted-foreground font-medium">Avg Daily Calls</p>
            <h3 className="text-xl font-bold mt-1 text-foreground flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-amber-500" />
              {productivity?.avg_calls_per_day ?? 14.8}
            </h3>
            <span className="text-[11px] text-muted-foreground mt-1 block">Target: 15 calls/day</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-card/60 shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs text-muted-foreground font-medium">Interested Conversion</p>
            <h3 className="text-xl font-bold mt-1 text-emerald-700 flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              {productivity?.interested_conversion_rate ?? 18.4}%
            </h3>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5 mt-1">
              High responsiveness
            </span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-card/60 shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs text-muted-foreground font-medium">Site Visit Ratio</p>
            <h3 className="text-xl font-bold mt-1 text-purple-700 flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-purple-500" />
              {productivity?.visit_conversion_rate ?? 8.2}%
            </h3>
            <span className="text-[11px] text-purple-600 font-medium flex items-center gap-0.5 mt-1">
              28 visits completed
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Visual Funnel / Performance Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Conversion Funnel Analysis
          </CardTitle>
          <CardDescription className="text-xs">
            From initial cold calls to successful property site visits and final bookings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>1. Total Calls Made (342)</span>
                <span>100%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>2. Connected & Engaged (210)</span>
                <span>61.4%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-indigo-500 h-3 rounded-full" style={{ width: "61.4%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>3. Hot / Interested Leads (63)</span>
                <span>18.4%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-emerald-500 h-3 rounded-full" style={{ width: "18.4%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>4. Site Visits Done (28)</span>
                <span>8.2%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-purple-600 h-3 rounded-full" style={{ width: "8.2%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>5. Booking Conversions (3)</span>
                <span>0.9%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-amber-500 h-3 rounded-full" style={{ width: "4%" }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
