import React, { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileCheck2,
  LayoutDashboard,
  Search,
  Settings,
  XCircle,
  AlertTriangle,
  Download,
  FileText,
  MapPin,
  User,
  Users,
  Building,
  RefreshCw,
  ScanFace,
  Camera,
  ShieldCheck,
} from "lucide-react";
import { FaceAttendanceDialog } from "@/components/attendance/FaceAttendanceDialog";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import {
  defaultHrKpis,
  defaultAttendanceTrend,
  defaultPieData,
  defaultHrAlerts,
  defaultEmployees,
  type HrEmployee,
} from "@/lib/services/hr";

export const Route = createFileRoute("/hr-dashboard/")({
  head: () => ({
    meta: [
      { title: "HR Central Management Dashboard | Vrindavan ERP" },
      { name: "description", content: "Human Resources overview, attendance analytics, workforce compliance, and live check-in monitoring." },
    ],
  }),
  component: HrDashboardOverviewPage,
});

function HrDashboardOverviewPage() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All Departments");
  const [employees, setEmployees] = useState<HrEmployee[]>(defaultEmployees);

  const [showFaceModal, setShowFaceModal] = useState(false);
  const [punchAction, setPunchAction] = useState<"check-in" | "check-out">("check-in");
  const [selfPunch, setSelfPunch] = useState<{
    hasCheckedIn: boolean;
    checkInTime: string | null;
    hasCheckedOut: boolean;
    checkOutTime: string | null;
  }>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("hr_self_attendance") : null;
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      hasCheckedIn: true,
      checkInTime: "09:28 AM",
      hasCheckedOut: false,
      checkOutTime: null,
    };
  });

  const handleSelfPunchSuccess = (record: {
    action: "check-in" | "check-out";
    time: string;
    status: "Present" | "Absent";
    confidence: number;
    photo?: string;
  }) => {
    const timeStr = record.time || new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    if (record.action === "check-in") {
      const up = { ...selfPunch, hasCheckedIn: true, checkInTime: timeStr };
      setSelfPunch(up);
      localStorage.setItem("hr_self_attendance", JSON.stringify(up));
      toast.success(`Face Check-In recorded at ${timeStr} (${record.confidence}% match). Status: Present!`);
    } else {
      const up = { ...selfPunch, hasCheckedOut: true, checkOutTime: timeStr };
      setSelfPunch(up);
      localStorage.setItem("hr_self_attendance", JSON.stringify(up));
      toast.success(`Face Check-Out recorded at ${timeStr}. Good work today!`);
    }
  };

  const departments = [
    "All Departments",
    "Engineering",
    "Design",
    "Sales",
    "HR",
    "Finance",
    "Marketing",
    "Support",
  ];

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.dept.toLowerCase().includes(search.toLowerCase()) ||
        (employee.role || "").toLowerCase().includes(search.toLowerCase());
      const matchesDept = dept === "All Departments" || employee.dept === dept;
      return matchesSearch && matchesDept;
    });
  }, [employees, search, dept]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Present":
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px]">Present</Badge>;
      case "Late":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-[10px]">Late Check-in</Badge>;
      case "Absent":
        return <Badge className="bg-rose-100 text-rose-800 border-rose-300 text-[10px]">Absent</Badge>;
      case "On Leave":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-300 text-[10px]">On Leave</Badge>;
      case "WFH":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300 text-[10px]">Work From Home</Badge>;
      default:
        return <Badge variant="outline" className="text-[10px]">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <LayoutDashboard className="size-6 text-primary" />
            HR & Workforce Central Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Live attendance tracking, workforce analytics, geofence compliance, and employee operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="h-8 text-xs gap-1.5 font-semibold">
            <Link to="/hr-dashboard/employees/all">
              <Users className="h-3.5 w-3.5" />
              Manage Employees
            </Link>
          </Button>
          <Button size="sm" asChild className="h-8 text-xs gap-1.5 font-semibold">
            <Link to="/hr-dashboard/attendance/leave-requests">
              <FileCheck2 className="h-3.5 w-3.5" />
              Review Leaves
            </Link>
          </Button>
        </div>
      </div>

      {/* HR Self Face Attendance Quick-Punch Banner */}
      <Card className="border border-primary/20 bg-gradient-to-r from-primary/5 via-primary/[0.02] to-background shadow-xs">
        <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 relative">
              <ScanFace className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-foreground">HR Self Attendance (Biometric Face ID)</span>
                {selfPunch.hasCheckedIn ? (
                  <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Punched In ({selfPunch.checkInTime})
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-300 bg-amber-50">
                    Not Punched In
                  </Badge>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-2 flex-wrap">
                <span>Vrindavan Campus (Gate 1)</span>
                <span>•</span>
                <span>Shift: 09:30 AM - 06:30 PM</span>
                <span>•</span>
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Geofence Verified
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <Button
              onClick={() => {
                setPunchAction("check-in");
                setShowFaceModal(true);
              }}
              size="sm"
              className="h-8 text-xs gap-1.5 font-bold bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              <Camera className="h-3.5 w-3.5" />
              Face Check-In
            </Button>
            <Button
              onClick={() => {
                setPunchAction("check-out");
                setShowFaceModal(true);
              }}
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1.5 font-semibold border-rose-300 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
            >
              <Clock3 className="h-3.5 w-3.5" />
              Face Check-Out
            </Button>
            <Button variant="ghost" size="sm" asChild className="h-8 text-xs text-muted-foreground">
              <Link to="/hr-dashboard/attendance/face-punch">
                View History
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 8 Primary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-4 gap-2.5">
        {defaultHrKpis.map((kpi, idx) => (
          <Card key={idx} className="border rounded-xl p-3 bg-card shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">{kpi.title}</span>
              <span className={`text-[10px] font-bold ${kpi.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                {kpi.change}
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-foreground mt-1">{kpi.value}</div>
            <span className="text-[10px] text-muted-foreground">vs yesterday</span>
          </Card>
        ))}
      </div>

      {/* Charts Grid: Weekly Trend + Donut Distribution */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        {/* Weekly Trend Bar Chart */}
        <Card className="xl:col-span-2">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Weekly Attendance Trend (Company-Wide)
            </CardTitle>
            <CardDescription className="text-xs">Out of 1,247 registered staff and executives</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={defaultAttendanceTrend} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="present" fill="#22c55e" radius={[4, 4, 0, 0]} name="Present" />
                <Bar dataKey="wfh" fill="#3b82f6" radius={[4, 4, 0, 0]} name="WFH" />
                <Bar dataKey="leave" fill="#a855f7" radius={[4, 4, 0, 0]} name="Leave" />
                <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Donut Chart Attendance Distribution */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold">Today's Workforce Split</CardTitle>
            <CardDescription className="text-xs">1,089 of 1,247 active today</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 h-[280px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={defaultPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {defaultPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Alerts Banner */}
      <Card className="border-amber-200 bg-amber-50/40">
        <CardHeader className="p-3 pb-1">
          <CardTitle className="text-xs font-bold text-amber-800 flex items-center gap-1.5 uppercase tracking-wider">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            Live Biometric & Geofence Exceptions Today
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {defaultHrAlerts.map((alert) => (
              <div key={alert.id} className="p-2 rounded-lg bg-card border text-xs shadow-2xs">
                <div className="flex items-center justify-between font-semibold text-foreground">
                  <span>{alert.title}</span>
                  <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{alert.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Employee Attendance Roster Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Clock3 className="h-5 w-5 text-primary" />
              Today's Live Employee Attendance Roster
            </CardTitle>
            <CardDescription className="text-xs">
              Real-time punch-ins, work location tags, and shift durations.
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-44 sm:w-56">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-xs"
              />
            </div>

            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d} value={d} className="text-xs">
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-xs font-bold">Employee Name</TableHead>
                  <TableHead className="text-xs font-bold">Department</TableHead>
                  <TableHead className="text-xs font-bold">Role</TableHead>
                  <TableHead className="text-xs font-bold">Check-In</TableHead>
                  <TableHead className="text-xs font-bold">Check-Out</TableHead>
                  <TableHead className="text-xs font-bold">Work Duration</TableHead>
                  <TableHead className="text-xs font-bold">Location</TableHead>
                  <TableHead className="text-xs font-bold text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((emp) => (
                  <TableRow key={emp.id} className="text-xs hover:bg-muted/30">
                    <TableCell className="font-semibold text-foreground flex items-center gap-2">
                      <div className="size-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-[10px]">
                        {emp.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span>{emp.name}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{emp.dept}</TableCell>
                    <TableCell className="text-foreground">{emp.role || "Staff"}</TableCell>
                    <TableCell className="font-medium text-emerald-700">{emp.checkIn}</TableCell>
                    <TableCell className="text-muted-foreground">{emp.checkOut}</TableCell>
                    <TableCell className="font-medium">{emp.hours}</TableCell>
                    <TableCell className="text-muted-foreground flex items-center gap-1 mt-1">
                      {emp.location !== "-" && <MapPin className="size-3 text-muted-foreground shrink-0" />}
                      <span>{emp.location}</span>
                    </TableCell>
                    <TableCell className="text-right">{getStatusBadge(emp.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Face Biometric Punch Modal */}
      <FaceAttendanceDialog
        open={showFaceModal}
        onOpenChange={setShowFaceModal}
        actionType={punchAction}
        employeeName="HR Manager (You)"
        onSuccess={handleSelfPunchSuccess}
      />
    </div>
  );
}

