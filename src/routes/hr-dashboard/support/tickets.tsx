import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ListTodo,
  Clock,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Filter,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/hr-dashboard/support/tickets")({
  component: SupportTicketsPage,
});

const mockTickets = [
  {
    id: "T-101",
    employee: "Himanshu Raut",
    subject: "Biometric Geofence sync latency on mobile browser",
    category: "Technical",
    priority: "High",
    status: "Open",
    created: "Aug 6, 2026",
  },
  {
    id: "T-102",
    employee: "Indrajeet",
    subject: "Professional tax deduction query for July",
    category: "Finance",
    priority: "Medium",
    status: "In Progress",
    created: "Aug 5, 2026",
  },
  {
    id: "T-103",
    employee: "Akshay",
    subject: "Request for replacement RFID access card",
    category: "HR Operations",
    priority: "Low",
    status: "Resolved",
    created: "Aug 3, 2026",
  },
  {
    id: "T-104",
    employee: "Kamal",
    subject: "Payroll account branch IFSC change",
    category: "Finance",
    priority: "High",
    status: "Resolved",
    created: "Aug 1, 2026",
  },
  {
    id: "T-105",
    employee: "Lokendra",
    subject: "Urgent leave regularization due to internet outage",
    category: "Attendance",
    priority: "Urgent",
    status: "Open",
    created: "Today 10:14 AM",
  },
];

function SupportTicketsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredTickets = mockTickets.filter(t => {
    const matchStatus = statusFilter === "all" || t.status.toLowerCase() === statusFilter.toLowerCase();
    const matchPriority = priorityFilter === "all" || t.priority.toLowerCase() === priorityFilter.toLowerCase();
    return matchStatus && matchPriority;
  });

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" /> Employee Support Tickets
          </h1>
          <p className="text-sm text-muted-foreground">Manage employee helpdesk inquiries, payroll doubts, and technical tickets.</p>
        </div>
        <Button variant="outline" asChild size="sm">
          <Link to="/hr-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: "Total Tickets", value: "15", icon: ListTodo, color: "text-primary", bg: "bg-primary/10" },
          { label: "Open", value: "5", icon: Clock, color: "text-blue-600", bg: "bg-blue-500/10" },
          { label: "In Progress", value: "3", icon: Loader2, color: "text-amber-600", bg: "bg-amber-500/10" },
          { label: "Resolved", value: "7", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-500/10" },
          { label: "Urgent", value: "1", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-500/10" },
        ].map((stat, i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="p-3 sm:p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${stat.bg} shrink-0`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-semibold">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter & Table */}
      <Card className="shadow-sm">
        <CardHeader className="py-4 border-b">
          <CardTitle className="text-base font-semibold">Helpdesk Queue</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="hr">HR Operations</SelectItem>
                <SelectItem value="attendance">Attendance</SelectItem>
              </SelectContent>
            </Select>

            <Button className="h-9">
              <Filter className="mr-2 h-4 w-4" /> Filter Tickets
            </Button>
          </div>

          <div className="overflow-x-auto w-full rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Ticket #</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-bold font-mono text-primary text-xs">
                      {t.id}
                    </TableCell>
                    <TableCell className="font-semibold text-sm">{t.employee}</TableCell>
                    <TableCell className="text-xs max-w-sm truncate font-medium">{t.subject}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{t.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={t.priority === "Urgent" ? "destructive" : t.priority === "High" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {t.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={t.status === "Resolved" ? "default" : t.status === "In Progress" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {t.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-mono text-right text-muted-foreground">{t.created}</TableCell>
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
