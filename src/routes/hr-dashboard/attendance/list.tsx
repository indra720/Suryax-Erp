import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, LayoutDashboard, Clock, UserCheck, UserX, AlertTriangle, Percent, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/hr-dashboard/attendance/list")({
  component: AttendanceListPage,
});

const attendanceData = [
  { member: "Gaurav Verma", email: "gaurav@gmail.com", date: "01 Aug", day: "Saturday", in: "14:03", out: "14:53", duration: "00:49:55", status: "Complete" },
  { member: "Kamal", email: "kamal@gmail.com", date: "01 Aug", day: "Saturday", in: "10:08", out: "10:09", duration: "00:00:04", status: "Complete" },
  { member: "Purvansh", email: "purvansh@gmail.com", date: "01 Aug", day: "Saturday", in: "10:08", out: "10:08", duration: "00:00:05", status: "Complete" },
  { member: "Akshay", email: "akshay@gmail.com", date: "01 Aug", day: "Saturday", in: "10:08", out: "10:08", duration: "00:00:05", status: "Complete" },
  { member: "Khushi", email: "khushi@gmail.com", date: "01 Aug", day: "Saturday", in: "10:07", out: "10:07", duration: "00:00:04", status: "Complete" },
  { member: "Indrajeet", email: "indrajeet@gmail.com", date: "01 Aug", day: "Saturday", in: "10:07", out: "10:07", duration: "00:00:05", status: "Complete" },
  { member: "Himanshu Raut", email: "himanshuraut0968@gmail.com", date: "01 Aug", day: "Saturday", in: "10:04", out: "14:45", duration: "04:40:25", status: "Complete" },
  { member: "Himanshu Raut", email: "himanshuraut0968@gmail.com", date: "31 Jul", day: "Friday", in: "18:00", out: "18:57", duration: "00:56:55", status: "Complete" },
];

function AttendanceListPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const stats = [
    { label: "Working Days", value: "3", icon: <Clock className="h-5 w-5 text-blue-600" /> },
    { label: "Present", value: "31", icon: <UserCheck className="h-5 w-5 text-green-600" /> },
    { label: "Absent", value: "0", icon: <UserX className="h-5 w-5 text-red-600" /> },
    { label: "Half Days", value: "0", icon: <AlertTriangle className="h-5 w-5 text-amber-600" /> },
    { label: "Attendance Rate", value: "95.5%", icon: <Percent className="h-5 w-5 text-purple-600" /> },
  ];

  return (
    <div className="p-1 sm:p-2 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance Records</h1>
          <p className="text-sm text-muted-foreground">Monitor daily check-ins, office timestamps, and attendance insights.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild size="sm">
            <Link to="/hr-dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> HR Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild size="sm">
            <Link to="/hr-dashboard/attendance/calendar">
              <CalendarIcon className="mr-2 h-4 w-4" /> Calendar View
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((stat, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="p-3 sm:p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {stat.icon}
                <p className="text-[11px] text-muted-foreground font-semibold uppercase">{stat.label}</p>
              </div>
              <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Section */}
      <Card className="shadow-sm">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-semibold">Refine Attendance Date</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3 pt-0 px-4 pb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full sm:w-[240px] justify-start text-left font-normal h-9", !date && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button className="h-9" size="sm">Apply Filter</Button>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>MEMBER</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>IN</TableHead>
                <TableHead>OUT</TableHead>
                <TableHead>DURATION</TableHead>
                <TableHead>STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">{row.member.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm leading-tight">{row.member}</p>
                        <p className="text-xs text-muted-foreground">{row.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-sm leading-tight">{row.date}</p>
                    <p className="text-xs text-muted-foreground">{row.day}</p>
                  </TableCell>
                  <TableCell className="text-sm font-mono">{row.in}</TableCell>
                  <TableCell className="text-sm font-mono">{row.out}</TableCell>
                  <TableCell className="text-sm font-mono text-muted-foreground">{row.duration}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
