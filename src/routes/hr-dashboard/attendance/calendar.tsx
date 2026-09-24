import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, List, ChevronLeft, ChevronRight, FileDown, Users, CheckCircle2, XCircle, Clock, ArrowLeft } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, startOfWeek, endOfWeek, addMonths, subMonths } from "date-fns";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hr-dashboard/attendance/calendar")({
  component: AttendanceCalendarPage,
});

function AttendanceCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const stats = [
    { label: "Total Present", value: "7", icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" /> },
    { label: "Absent Employees", value: "2", icon: <XCircle className="h-5 w-5 text-rose-600" /> },
    { label: "Half Days", value: "0", icon: <Clock className="h-5 w-5 text-blue-600" /> },
    { label: "Total Employees", value: "9", icon: <Users className="h-5 w-5 text-purple-600" /> },
  ];

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="p-1 sm:p-2 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance Calendar</h1>
          <p className="text-sm text-muted-foreground">Monitor employee attendance rosters and monthly trends.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild size="sm">
            <Link to="/hr-dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> HR Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild size="sm">
            <Link to="/hr-dashboard/attendance/list">
              <List className="mr-2 h-4 w-4" /> View List
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="p-3 sm:p-4 flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg shrink-0">{stat.icon}</div>
              <div>
                <p className="text-[11px] text-muted-foreground font-semibold uppercase">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendar Controls */}
      <Card className="shadow-sm p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold min-w-[150px]">{format(currentDate, "MMMM yyyy")}</h2>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] h-9">
                <SelectValue placeholder="All Employees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                <SelectItem value="indrajeet">Indrajeet</SelectItem>
                <SelectItem value="himanshu">Himanshu Raut</SelectItem>
                <SelectItem value="akshay">Akshay</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-9" onClick={() => setCurrentDate(new Date())}>
              <CalendarIcon className="mr-2 h-4 w-4" /> Today
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button size="sm" className="h-9 gap-2">
              <FileDown className="h-4 w-4" /> Download Report
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-3 border-t">
          {months.map((month, i) => (
            <Badge
              key={month}
              variant={i === currentDate.getMonth() ? "default" : "outline"}
              className="cursor-pointer text-xs"
              onClick={() => {
                const next = new Date(currentDate);
                next.setMonth(i);
                setCurrentDate(next);
              }}
            >
              {month}
            </Badge>
          ))}
          <Select defaultValue="2026">
            <SelectTrigger className="w-[90px] h-7 text-xs ml-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Calendar Grid */}
      <Card className="shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 gap-px bg-border border-b text-center">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
            <div key={day} className="bg-muted/40 p-2 text-xs font-semibold text-muted-foreground">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-border">
          {daysInMonth.map((day, i) => {
            const status = i % 8 === 0 ? "holiday" : i % 7 === 0 ? "absent" : i % 6 === 0 ? "half" : i % 5 === 0 ? "partial" : "present";
            
            const statusStyles = {
              present: "bg-emerald-50 text-emerald-700 border border-emerald-200",
              absent: "bg-rose-50 text-rose-700 border border-rose-200",
              half: "bg-blue-50 text-blue-700 border border-blue-200",
              partial: "bg-amber-50 text-amber-700 border border-amber-200",
              holiday: "bg-slate-800 text-white",
            };

            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <div
                key={i}
                className={cn(
                  "bg-card min-h-[75px] sm:min-h-[95px] p-1.5 sm:p-2 flex flex-col justify-between transition-colors",
                  !isCurrentMonth && "bg-muted/30 text-muted-foreground opacity-50"
                )}
              >
                <p className="text-xs sm:text-sm font-semibold">{format(day, "d")}</p>
                {isCurrentMonth && (
                  <div className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded truncate text-center", statusStyles[status as keyof typeof statusStyles])}>
                    {status.toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
