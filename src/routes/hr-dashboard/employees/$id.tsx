import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Building,
  Briefcase,
  Activity,
  CheckCircle2,
  Clock,
  Edit,
  Power,
  Lock,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/employees/$id")({
  component: EmployeeDetailsPage,
});

function EmployeeDetailsPage() {
  const { id } = useParams({ from: "/hr-dashboard/employees/$id" });
  const { toast } = useToast();

  const employee = {
    id: id || "EMP0001",
    name: "Himanshu Raut",
    email: "himanshuraut0968@gmail.com",
    phone: "+91 98765 43210",
    role: "Senior Full Stack Engineer",
    department: "Engineering",
    designation: "Tech Lead",
    joiningDate: "15 Jan 2024",
    status: "Active",
    shift: "General Day Shift (09:30 AM - 06:30 PM)",
    faceStatus: "Registered (98.5% confidence)",
    stats: {
      totalCheckins: 142,
      thisMonth: 22,
      thisWeek: 4,
    },
    attendanceHistory: [
      { date: "01 Aug 2026", day: "Saturday", checkin: "10:04 AM", checkout: "02:45 PM", duration: "04h 40m", status: "Today" },
      { date: "31 Jul 2026", day: "Friday", checkin: "09:28 AM", checkout: "06:32 PM", duration: "09h 04m", status: "Present" },
      { date: "30 Jul 2026", day: "Thursday", checkin: "09:30 AM", checkout: "06:40 PM", duration: "09h 10m", status: "Present" },
      { date: "29 Jul 2026", day: "Wednesday", checkin: "09:25 AM", checkout: "06:30 PM", duration: "09h 05m", status: "Present" },
      { date: "28 Jul 2026", day: "Tuesday", checkin: "09:35 AM", checkout: "06:35 PM", duration: "09h 00m", status: "Present" },
    ],
    recentCheckins: [
      { date: "01 Aug 2026", time: "10:04:12 AM" },
      { date: "31 Jul 2026", time: "09:28:45 AM" },
      { date: "30 Jul 2026", time: "09:30:02 AM" },
      { date: "29 Jul 2026", time: "09:25:19 AM" },
    ],
  };

  return (
    <div className="p-1 sm:p-2 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employee Profile: {employee.name}</h1>
          <p className="text-sm text-muted-foreground">ID: {employee.id} • {employee.department} • {employee.designation}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild size="sm">
            <Link to="/hr-dashboard/employees/all">
              <ArrowLeft className="mr-2 h-4 w-4" /> Employee Directory
            </Link>
          </Button>
          <Button size="sm" onClick={() => toast({ title: "Edit Employee", description: "Opening employee master editor." })}>
            <Edit className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b">
                <Avatar className="h-20 w-20 border-2 border-primary/20">
                  <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                    {employee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">{employee.name}</h2>
                    <Badge variant="default" className="text-xs bg-emerald-600">{employee.status}</Badge>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{employee.role}</p>
                  <p className="text-xs text-muted-foreground font-mono">{employee.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 text-xs">
                <div className="bg-muted/30 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Department</span>
                  <span className="font-semibold text-sm">{employee.department}</span>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Assigned Shift</span>
                  <span className="font-semibold text-xs text-primary">{employee.shift}</span>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Biometrics Face</span>
                  <span className="font-semibold text-xs text-emerald-600">{employee.faceStatus}</span>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Joining Date</span>
                  <span className="font-semibold text-xs">{employee.joiningDate}</span>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Phone</span>
                  <span className="font-semibold text-xs">{employee.phone}</span>
                </div>
                <div className="bg-muted/30 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase block">Employee Code</span>
                  <span className="font-semibold font-mono text-xs text-primary">{employee.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance History */}
          <Card className="shadow-sm border">
            <CardHeader className="py-3 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" /> Recent Attendance Punches
              </CardTitle>
              <Button variant="outline" asChild size="sm" className="h-7 text-xs">
                <Link to="/hr-dashboard/attendance/list">Full Records</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Check-in</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employee.attendanceHistory.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold text-xs">{record.date}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{record.day}</TableCell>
                      <TableCell className="text-xs font-mono">{record.checkin}</TableCell>
                      <TableCell className="text-xs font-mono">{record.checkout}</TableCell>
                      <TableCell className="text-xs font-mono">{record.duration}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={record.status === "Today" ? "default" : "secondary"}
                          className="text-[10px]"
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="shadow-sm border">
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Attendance Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 bg-muted/40 rounded-lg border">
                  <p className="text-2xl font-extrabold text-primary">{employee.stats.totalCheckins}</p>
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Total</p>
                </div>
                <div className="p-2.5 bg-muted/40 rounded-lg border">
                  <p className="text-2xl font-extrabold text-emerald-600">{employee.stats.thisMonth}</p>
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">This Month</p>
                </div>
                <div className="p-2.5 bg-muted/40 rounded-lg border">
                  <p className="text-2xl font-extrabold text-blue-600">{employee.stats.thisWeek}</p>
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Live Time Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y">
              {employee.recentCheckins.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{item.date}</span>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">{item.time}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-base font-semibold">HR Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-2 grid gap-1">
              <Button variant="ghost" size="sm" className="justify-start text-xs h-9" asChild>
                <Link to="/hr-dashboard/attendance/logs">
                  <Activity className="mr-2 h-4 w-4 text-primary" /> View Full Activity Logs
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="justify-start text-xs h-9" asChild>
                <Link to="/hr-dashboard/finance/salary">
                  <Briefcase className="mr-2 h-4 w-4 text-primary" /> View Salary & Payroll
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="justify-start text-xs h-9 text-rose-600 hover:bg-rose-50 hover:text-rose-700" onClick={() => toast({ title: "Account Suspended", description: `Employee ${employee.name} deactivated.` })}>
                <Power className="mr-2 h-4 w-4" /> Deactivate Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
