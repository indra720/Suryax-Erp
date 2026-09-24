import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Filter, ArrowLeft, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/tasks/face-updates")({
  component: FaceUpdatesPage,
});

const initialRequests = [
  { id: 1, name: "Himanshu Raut", email: "himanshu@gmail.com", status: "Pending", requested: "Aug 6, 2026", reviewed: "-", reason: "Prescription glasses changed" },
  { id: 2, name: "Lokendra", email: "lokendra@gmail.com", status: "Approved", requested: "Aug 5, 2026", reviewed: "Aug 6, 2026", reason: "Old low resolution photo" },
  { id: 3, name: "John Doe", email: "john@example.com", status: "Rejected", requested: "Aug 4, 2026", reviewed: "Aug 4, 2026", reason: "Unclear camera blur" },
  { id: 4, name: "Sarah Chen", email: "sarah@example.com", status: "Completed", requested: "Aug 3, 2026", reviewed: "Aug 4, 2026", reason: "Annual profile verification" },
];

function FaceUpdatesPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleAction = (id: number, newStatus: "Approved" | "Rejected") => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus, reviewed: "Just now" } : r));
    toast({
      title: `Face Request ${newStatus}`,
      description: `Request #${id} has been marked as ${newStatus}.`,
    });
  };

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesSearch = req.name.toLowerCase().includes(search.toLowerCase()) || req.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || req.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Face Update Requests</h1>
          <p className="text-sm text-muted-foreground">Review and approve employee biometric face re-registration requests.</p>
        </div>
        <Button variant="outline" asChild size="sm">
          <Link to="/hr-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
          </Link>
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-4 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Status</label>
              <Select onValueChange={setStatusFilter} defaultValue="All">
                <SelectTrigger className="h-9"><SelectValue placeholder="All statuses" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Employee</label>
              <Input
                placeholder="Search name or email..."
                className="h-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Requested after</label>
              <Input type="date" className="h-9" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Requested before</label>
              <Input type="date" className="h-9" />
            </div>
            <Button className="h-9" variant="secondary">
              <Filter className="mr-2 h-4 w-4" /> Apply
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((req, i) => (
                <TableRow key={req.id}>
                  <TableCell className="font-mono text-xs">{i + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                        {req.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{req.name}</div>
                        <div className="text-xs text-muted-foreground">{req.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={req.status === "Pending" ? "secondary" : req.status === "Rejected" ? "destructive" : "default"}>
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-mono">{req.requested}</TableCell>
                  <TableCell className="text-xs max-w-[200px] truncate">{req.reason}</TableCell>
                  <TableCell className="text-right">
                    {req.status === "Pending" ? (
                      <div className="flex justify-end gap-1.5">
                        <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700 text-xs" onClick={() => handleAction(req.id, "Approved")}>
                          <Check className="h-3.5 w-3.5 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-rose-600 border-rose-200 hover:bg-rose-50 text-xs" onClick={() => handleAction(req.id, "Rejected")}>
                          <X className="h-3.5 w-3.5 mr-1" /> Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="font-semibold text-xs uppercase text-muted-foreground">{req.status}</span>
                    )}
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
