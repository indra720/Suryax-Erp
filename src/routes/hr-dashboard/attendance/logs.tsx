import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Download, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/hr-dashboard/attendance/logs")({
  component: AttendanceLogsPage,
});

const logs = [
  { id: 42, timestamp: "31 Jul 2026 14:59:52", employee: "Himanshu Raut", action: "Check-Out Failed", status: "Failed", reason: "outside_office_premises" },
  { id: 43, timestamp: "31 Jul 2026 14:54:41", employee: "Himanshu Raut", action: "Check-In Success", status: "Success", reason: "57.7% confidence" },
  { id: 44, timestamp: "31 Jul 2026 10:40:37", employee: "Lokendra", action: "Check-Out Success", status: "Success", reason: "Biometric Verified" },
  { id: 45, timestamp: "31 Jul 2026 10:40:17", employee: "Himanshu Raut", action: "Check-Out Success", status: "Success", reason: "Biometric Verified" },
  { id: 46, timestamp: "31 Jul 2026 09:30:12", employee: "Indrajeet", action: "Check-In Success", status: "Success", reason: "Office WiFi Geofence" },
  { id: 47, timestamp: "31 Jul 2026 09:28:44", employee: "Akshay", action: "Check-In Success", status: "Success", reason: "Office WiFi Geofence" },
];

function AttendanceLogsPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredLogs = logs.filter(l => {
    if (statusFilter === "all") return true;
    return l.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance Activity Logs</h1>
          <p className="text-sm text-muted-foreground">Monitor real-time biometric and geofenced check-in/check-out attempts.</p>
        </div>
        <Button variant="outline" asChild size="sm">
          <Link to="/hr-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { title: "Total Activities", value: "379" },
          { title: "Successful", value: "352" },
          { title: "Failed Attempts", value: "27" },
          { title: "Recent Failures", value: "10" },
        ].map((stat) => (
          <Card key={stat.title} className="shadow-sm">
            <CardHeader className="pb-1 pt-4 px-4">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3">
          <CardTitle className="text-base font-semibold">Activity Records</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2.5 mb-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px] h-9"><SelectValue placeholder="All Employees" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                <SelectItem value="indrajeet">Indrajeet</SelectItem>
                <SelectItem value="himanshu">Himanshu Raut</SelectItem>
                <SelectItem value="lokendra">Lokendra</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px] h-9"><SelectValue placeholder="All Actions" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="checkin">Check-In</SelectItem>
                <SelectItem value="checkout">Check-Out</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] h-9"><SelectValue placeholder="All Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" className="w-[140px] h-9" />
            <Input type="date" className="w-[140px] h-9" />
            <Button size="sm" className="h-9"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          </div>

          <div className="rounded-md border overflow-x-auto w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>TIMESTAMP</TableHead>
                  <TableHead>EMPLOYEE</TableHead>
                  <TableHead>ACTION</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>REASON / CONFIDENCE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className={log.status === "Failed" ? "bg-rose-50/50 dark:bg-rose-950/20" : ""}>
                    <TableCell className="font-mono text-xs">{log.id}</TableCell>
                    <TableCell className="text-xs font-medium">{log.timestamp}</TableCell>
                    <TableCell className="font-medium text-sm">{log.employee}</TableCell>
                    <TableCell className="text-sm">{log.action}</TableCell>
                    <TableCell>
                      <Badge variant={log.status === "Success" ? "default" : "destructive"}>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{log.reason}</TableCell>
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
