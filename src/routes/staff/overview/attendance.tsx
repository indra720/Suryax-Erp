import React, { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, RefreshCw, User, FileText, Navigation } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { fetchStaffAttendanceTracker } from "@/lib/services/staff";

export const Route = createFileRoute("/staff/overview/attendance")({
  head: () => ({
    meta: [{ title: "My Attendance Logs & Calendar | Vrindavan ERP Staff" }],
  }),
  component: StaffAttendancePage,
});

export function StaffAttendancePage() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
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

  const attendanceLogs = [
    { date: "2026-09-23", day: "Wednesday", inTime: "09:28 AM", outTime: "06:34 PM", hours: "9h 06m", status: "Present", location: "Main Branch Office" },
    { date: "2026-09-22", day: "Tuesday", inTime: "09:31 AM", outTime: "06:30 PM", hours: "8h 59m", status: "Present", location: "Main Branch Office" },
    { date: "2026-09-21", day: "Monday", inTime: "09:48 AM", outTime: "06:45 PM", hours: "8h 57m", status: "Late", location: "Main Branch Office" },
    { date: "2026-09-20", day: "Sunday", inTime: "-", outTime: "-", hours: "-", status: "Sunday Off", location: "-" },
    { date: "2026-09-19", day: "Saturday", inTime: "09:25 AM", outTime: "06:32 PM", hours: "9h 07m", status: "Present", location: "Main Branch Office" },
    { date: "2026-09-18", day: "Friday", inTime: "09:29 AM", outTime: "06:30 PM", hours: "9h 01m", status: "Present", location: "Main Branch Office" },
    { date: "2026-09-17", day: "Thursday", inTime: "-", outTime: "-", hours: "-", status: "Casual Leave", location: "-" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Navigation Submenu Tabs */}
      {/* <div className="flex items-center gap-1 border-b pb-2 text-xs font-medium">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/overview">Overview</Link>
        </Button>
        <Button variant="secondary" size="sm" asChild className="font-semibold">
          <Link to="/staff/overview/attendance">Attendance</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/overview/leave">Leave Requests</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/overview/location">Location & Geofence</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/profile">My Profile</Link>
        </Button>
      </div> */}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-l-4 border-l-emerald-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <span className="text-xs text-muted-foreground font-medium">Present Days</span>
            <h3 className="text-xl font-bold mt-1 text-emerald-700">22 Days</h3>
            <span className="text-[11px] text-muted-foreground">91.6% Rate</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <span className="text-xs text-muted-foreground font-medium">Late Markings</span>
            <h3 className="text-xl font-bold mt-1 text-amber-700">2 Days</h3>
            <span className="text-[11px] text-muted-foreground">Within grace limit</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <span className="text-xs text-muted-foreground font-medium">Avg Daily Shift</span>
            <h3 className="text-xl font-bold mt-1 text-foreground">8h 58m</h3>
            <span className="text-[11px] text-emerald-600 font-medium">+58 mins over target</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <span className="text-xs text-muted-foreground font-medium">Approved Leaves</span>
            <h3 className="text-xl font-bold mt-1 text-purple-700">1 Day</h3>
            <span className="text-[11px] text-muted-foreground">Casual Leave</span>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Detailed Attendance Log History
            </CardTitle>
            <CardDescription className="text-xs">
              Daily punch-in, punch-out, and verified office location logs.
            </CardDescription>
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
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-xs font-bold">Date & Day</TableHead>
                  <TableHead className="text-xs font-bold">Check-In</TableHead>
                  <TableHead className="text-xs font-bold">Check-Out</TableHead>
                  <TableHead className="text-xs font-bold">Total Duration</TableHead>
                  <TableHead className="text-xs font-bold">Location</TableHead>
                  <TableHead className="text-xs font-bold text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceLogs.map((log, i) => (
                  <TableRow key={i} className="text-xs hover:bg-muted/30">
                    <TableCell className="font-semibold text-foreground">
                      <div>{log.date}</div>
                      <div className="text-[10px] text-muted-foreground">{log.day}</div>
                    </TableCell>
                    <TableCell className="text-emerald-700 font-medium">{log.inTime}</TableCell>
                    <TableCell className="text-foreground">{log.outTime}</TableCell>
                    <TableCell className="font-medium text-foreground">{log.hours}</TableCell>
                    <TableCell className="text-muted-foreground flex items-center gap-1 mt-1">
                      {log.location !== "-" && <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />}
                      <span>{log.location}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          log.status === "Present"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : log.status === "Late"
                            ? "bg-amber-50 text-amber-700 border-amber-300"
                            : log.status === "Casual Leave"
                            ? "bg-blue-50 text-blue-700 border-blue-300"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
