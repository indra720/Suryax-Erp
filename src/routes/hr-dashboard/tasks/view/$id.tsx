import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Calendar, ChevronDown, CheckCircle2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/tasks/view/$id")({
  component: TaskDetailsPage,
});

function TaskDetailsPage() {
  const { id } = useParams({ from: "/hr-dashboard/tasks/view/$id" });
  const { toast } = useToast();
  const [status, setStatus] = useState("In Progress");
  const [comment, setComment] = useState("");

  const handleUpdate = () => {
    toast({
      title: "Task Updated",
      description: `Task status changed to ${status}.`,
    });
    setComment("");
  };

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Task Details: #{id}</h1>
          <p className="text-sm text-muted-foreground">View timeline, update status, and manage task specifications.</p>
        </div>
        <Button variant="outline" asChild size="sm">
          <Link to="/hr-dashboard/tasks/board">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Board
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
              <CardTitle className="text-xl font-bold">AMS Multi-tenant Architecture</CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center bg-muted/50 px-2.5 py-1 rounded-md">
                  <Calendar className="mr-2 h-3.5 w-3.5" /> Due: Aug 13, 2026
                </span>
                <span className="flex items-center bg-muted/50 px-2.5 py-1 rounded-md">
                  <User className="mr-2 h-3.5 w-3.5" /> Assigned: Himanshu Raut
                </span>
                <Badge variant="outline" className="border-amber-300 text-amber-700 bg-amber-50">
                  Priority: High
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-muted/30 p-4 rounded-lg border">
                <div>
                  <p className="font-semibold text-foreground uppercase mb-0.5">Description</p>
                  <p className="text-muted-foreground text-sm">Add multi-tenant system and company role guards across ERP modules.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground uppercase mb-0.5">Assigned by</p>
                  <p className="text-muted-foreground text-sm">HR SuperAdmin</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground uppercase mb-0.5">Created</p>
                  <p className="text-muted-foreground font-mono">Aug 6, 2026 3:33 PM</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground uppercase mb-0.5">Last updated</p>
                  <p className="text-muted-foreground font-mono">Aug 6, 2026 5:15 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-base font-semibold">Activity & Update History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {[
                { title: "Status changed to In Progress", time: "Aug 6, 2026 3:33 PM • 2 hours ago", by: "Himanshu Raut" },
                { title: "Task assigned to Himanshu Raut", time: "Aug 6, 2026 10:00 AM • Today", by: "HR Admin" },
                { title: "Task created in Backlog", time: "Aug 5, 2026 06:12 PM • Yesterday", by: "SuperAdmin" },
              ].map((item, i) => (
                <Collapsible key={i} className="border-l-2 border-primary/40 pl-3">
                  <CollapsibleTrigger className="flex w-full items-center justify-between text-left p-2 hover:bg-muted/40 rounded transition-colors">
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.time} by {item.by}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2 pl-2 text-xs text-muted-foreground bg-muted/20 p-2.5 rounded mt-1">
                    System activity verified and logged in tamper-proof task ledger.
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-base font-semibold">Quick Status Update</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Share reason or context for this status change..."
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button className="w-full" size="sm" onClick={handleUpdate}>
                <CheckCircle2 className="mr-2 h-4 w-4" /> Update Status
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-base font-semibold">Edit Task Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Title</label>
                <Input defaultValue="AMS Multi-tenant Architecture" className="h-9" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Assignee</label>
                <Input defaultValue="Himanshu Raut" className="h-9" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Due Date</label>
                <Input type="date" defaultValue="2026-08-13" className="h-9" />
              </div>
              <Button variant="outline" className="w-full" size="sm" onClick={() => toast({ title: "Saved", description: "Task specifications updated." })}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
