import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/tasks/board")({
  component: TaskBoardPage,
});

interface TaskItem {
  id: string;
  title: string;
  assignedTo: string;
  priority: string;
  status: string;
  dueDate: string;
  description?: string;
}

const initialTasks: TaskItem[] = [
  { id: "1", title: "AMS Multi-tenant Architecture", assignedTo: "Himanshu Raut", priority: "High", status: "In Progress", dueDate: "2026-08-13", description: "Implement tenant isolation and route guard" },
  { id: "2", title: "Biometric Geofence Sync", assignedTo: "Indrajeet", priority: "Critical", status: "In Progress", dueDate: "2026-08-10", description: "Optimize location radius and GPS confidence checks" },
  { id: "3", title: "Salary Slip Export Validation", assignedTo: "Akshay", priority: "Medium", status: "Pending", dueDate: "2026-08-15", description: "Verify PF and Professional Tax monthly deductions" },
  { id: "4", title: "New Joiner RFID Cards", assignedTo: "Kamal", priority: "Low", status: "Completed", dueDate: "2026-08-01", description: "Print and deliver access badges" },
];

function TaskBoardPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignedTo, setAssignedTo] = useState("Himanshu Raut");
  const [dueDate, setDueDate] = useState("2026-08-15");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: TaskItem = {
      id: String(Date.now()),
      title,
      description: desc,
      assignedTo,
      dueDate,
      priority,
      status,
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
    setDesc("");
    toast({
      title: "Task Assigned",
      description: `Task "${newTask.title}" assigned to ${assignedTo}.`,
    });
  };

  const filteredTasks = tasks.filter(t => {
    const matchStatus = filterStatus === "all" || t.status.toLowerCase() === filterStatus.toLowerCase();
    const matchPriority = filterPriority === "all" || t.priority.toLowerCase() === filterPriority.toLowerCase();
    return matchStatus && matchPriority;
  });

  const countByStatus = (s: string) => tasks.filter(t => t.status.toLowerCase() === s.toLowerCase()).length;
  const countByPriority = (p: string) => tasks.filter(t => t.priority.toLowerCase() === p.toLowerCase()).length;

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">HR & Workforce Task Board</h1>
          <p className="text-sm text-muted-foreground">Assign, monitor, and review internal HR operational duties.</p>
        </div>
        <Button variant="outline" asChild size="sm">
          <Link to="/hr-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Insights */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Task Insights</CardTitle>
              <Badge variant="secondary">{tasks.length} Total Tasks</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">By Status</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { s: "Pending", bg: "bg-amber-50 dark:bg-amber-950/30", text: "text-amber-700 dark:text-amber-400" },
                  { s: "In Progress", bg: "bg-blue-50 dark:bg-blue-950/30", text: "text-blue-700 dark:text-blue-400" },
                  { s: "Completed", bg: "bg-emerald-50 dark:bg-emerald-950/30", text: "text-emerald-700 dark:text-emerald-400" },
                  { s: "Blocked", bg: "bg-rose-50 dark:bg-rose-950/30", text: "text-rose-700 dark:text-rose-400" }
                ].map(item => (
                  <div key={item.s} className={`${item.bg} p-2.5 rounded-lg text-center border`}>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">{item.s}</div>
                    <div className={`text-xl font-extrabold ${item.text}`}>{countByStatus(item.s)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">By Priority</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { p: "Low", bg: "bg-slate-50 dark:bg-slate-900/40", text: "text-slate-700 dark:text-slate-300" },
                  { p: "Medium", bg: "bg-sky-50 dark:bg-sky-950/30", text: "text-sky-700 dark:text-sky-400" },
                  { p: "High", bg: "bg-orange-50 dark:bg-orange-950/30", text: "text-orange-700 dark:text-orange-400" },
                  { p: "Critical", bg: "bg-rose-50 dark:bg-rose-950/30", text: "text-rose-700 dark:text-rose-400" }
                ].map(item => (
                  <div key={item.p} className={`${item.bg} p-2.5 rounded-lg text-center border`}>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">{item.p}</div>
                    <div className={`text-xl font-extrabold ${item.text}`}>{countByPriority(item.p)}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Task Form */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Assign New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-3.5">
              <Input
                placeholder="Task Title *"
                className="h-9"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Textarea
                placeholder="Description / requirements..."
                rows={2}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <Select value={assignedTo} onValueChange={setAssignedTo}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Assign to" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Himanshu Raut">Himanshu Raut</SelectItem>
                    <SelectItem value="Indrajeet">Indrajeet</SelectItem>
                    <SelectItem value="Akshay">Akshay</SelectItem>
                    <SelectItem value="Kamal">Kamal</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  className="h-9"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Priority" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Blocked">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" size="sm" className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" /> Create Task
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Overview */}
      <Card className="shadow-sm">
        <CardHeader className="py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <CardTitle className="text-base font-semibold">Active Tasks Roster</CardTitle>
            <div className="flex flex-wrap gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32 h-8 text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-32 h-8 text-xs"><SelectValue placeholder="Priority" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-semibold text-sm">
                    {task.title}
                    {task.description && <p className="text-xs text-muted-foreground font-normal">{task.description}</p>}
                  </TableCell>
                  <TableCell className="text-sm">{task.assignedTo}</TableCell>
                  <TableCell>
                    <Badge variant={task.priority === "Critical" ? "destructive" : "secondary"}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={task.status === "Completed" ? "default" : "outline"}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-mono">{task.dueDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild className="h-8 text-xs">
                      <Link to="/hr-dashboard/tasks/view/$id" params={{ id: task.id }}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
