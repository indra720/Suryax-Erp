import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Filter, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/attendance/leave-requests")({
  component: LeaveRequestsPage,
});

interface LeaveRequestItem {
  id: string;
  name: string;
  email: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const initialLeaveRequests: LeaveRequestItem[] = [
  {
    id: "LR-101",
    name: "Himanshu Raut",
    email: "himanshuraut0968@gmail.com",
    leaveType: "Sick Leave",
    fromDate: "2026-08-05",
    toDate: "2026-08-06",
    days: 2,
    reason: "Severe viral fever and doctor consultation",
    status: "Pending",
  },
  {
    id: "LR-102",
    name: "Kamal",
    email: "kamal@gmail.com",
    leaveType: "Casual Leave",
    fromDate: "2026-08-10",
    toDate: "2026-08-11",
    days: 2,
    reason: "Family function in hometown",
    status: "Approved",
  },
  {
    id: "LR-103",
    name: "Akshay",
    email: "akshay@gmail.com",
    leaveType: "Casual Leave",
    fromDate: "2026-08-12",
    toDate: "2026-08-12",
    days: 1,
    reason: "Personal banking work",
    status: "Pending",
  },
];

function LeaveRequestsPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<LeaveRequestItem[]>(initialLeaveRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleUpdateStatus = (id: string, newStatus: "Approved" | "Rejected") => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
    toast({
      title: `Leave Request ${newStatus}`,
      description: `Request ${id} has been marked as ${newStatus}.`,
    });
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.name.toLowerCase().includes(searchTerm.toLowerCase()) || req.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalRequests = requests.length;
  const approvedCount = requests.filter(r => r.status === "Approved").length;
  const rejectedCount = requests.filter(r => r.status === "Rejected").length;

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leave Requests</h1>
          <p className="text-sm text-muted-foreground">Review pending employee leave applications, approve or reject.</p>
        </div>
        <Button variant="outline" asChild size="sm">
          <Link to="/hr-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
          </Link>
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-wrap gap-3 items-center">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search name or email..."
              className="w-full sm:w-[240px] h-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Input type="date" className="w-[140px] h-9" />
            <Input type="date" className="w-[140px] h-9" />
            <Button size="sm" className="h-9"><Filter className="mr-2 h-4 w-4" /> Apply</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { title: "TOTAL REQUESTS", value: totalRequests, color: "text-foreground" },
          { title: "APPROVED", value: approvedCount, color: "text-emerald-600" },
          { title: "REJECTED", value: rejectedCount, color: "text-rose-600" },
        ].map((stat) => (
          <Card key={stat.title} className="shadow-sm">
            <CardHeader className="pb-1 pt-4 px-4">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <div className="font-semibold text-sm">{req.name}</div>
                      <div className="text-xs text-muted-foreground">{req.email}</div>
                    </TableCell>
                    <TableCell><Badge variant="secondary">{req.leaveType}</Badge></TableCell>
                    <TableCell className="text-xs font-mono">{req.fromDate} to {req.toDate}</TableCell>
                    <TableCell className="text-sm font-semibold">{req.days} Day(s)</TableCell>
                    <TableCell className="text-xs max-w-xs truncate">{req.reason}</TableCell>
                    <TableCell>
                      <Badge
                        variant={req.status === "Approved" ? "default" : req.status === "Rejected" ? "destructive" : "secondary"}
                      >
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {req.status === "Pending" ? (
                        <div className="flex justify-end gap-1.5">
                          <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700" onClick={() => handleUpdateStatus(req.id, "Approved")}>
                            <Check className="h-3.5 w-3.5 mr-1" /> Approve
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 text-rose-600 border-rose-200 hover:bg-rose-50" onClick={() => handleUpdateStatus(req.id, "Rejected")}>
                            <X className="h-3.5 w-3.5 mr-1" /> Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-muted-foreground uppercase">{req.status}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-3 rounded-full bg-muted mb-2">
                        <Search className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h4 className="font-semibold text-base">No leave requests found</h4>
                      <p className="text-xs text-muted-foreground">Employees can submit leave requests from their portal.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
