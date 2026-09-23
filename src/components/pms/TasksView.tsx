import React, { useState, useEffect, useMemo } from "react";
import {
  LayoutGrid,
  List,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  User,
  Calendar,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ChevronRight,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getPmsTasks,
  getPmsProjects,
  getPmsSprints,
  getPmsMilestones,
  getPmsTeamMembers,
  addPmsTask,
  updatePmsTask,
  updatePmsTaskStatus,
  deletePmsTask,
  TaskItem,
  TaskStatus,
  TaskPriority,
} from "@/lib/services/pms";

const ALL_STATUSES: TaskStatus[] = ["To Do", "In Progress", "Review", "Done", "Blocked"];

const statusBadgeStyles: Record<TaskStatus, string> = {
  "To Do": "bg-gray-100 text-gray-700 border-gray-200",
  "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
  "Review": "bg-purple-100 text-purple-800 border-purple-200",
  "Done": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Blocked": "bg-red-100 text-red-800 border-red-200",
};

const priorityBadgeStyles: Record<TaskPriority, string> = {
  low: "bg-gray-100 text-gray-700 border-gray-200",
  medium: "bg-blue-100 text-blue-700 border-blue-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  urgent: "bg-red-100 text-red-700 border-red-200 font-bold",
};

interface TasksViewProps {
  basePath?: string;
}

export function TasksView({ basePath = "/admin/project" }: TasksViewProps) {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [projects, setProjects] = useState(getPmsProjects());
  const [sprints, setSprints] = useState(getPmsSprints());
  const [milestones, setMilestones] = useState(getPmsMilestones());
  const [teamMembers, setTeamMembers] = useState(getPmsTeamMembers());

  const [viewMode, setViewMode] = useState<"board" | "list">("board");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");

  // Dialog States
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

  // Form States
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project_id: "",
    assignee_id: "",
    priority: "medium" as TaskPriority,
    status: "To Do" as TaskStatus,
    story_points: 3,
    estimated_hours: 16,
    due_date: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const refreshData = () => {
    setTasks(getPmsTasks());
    setProjects(getPmsProjects());
    setSprints(getPmsSprints());
    setMilestones(getPmsMilestones());
    setTeamMembers(getPmsTeamMembers());
  };

  useEffect(() => {
    refreshData();
    const handleStorage = () => refreshData();
    window.addEventListener("vrindavan-pms-change", handleStorage);
    return () => window.removeEventListener("vrindavan-pms-change", handleStorage);
  }, []);

  // Filter Tasks
  const filteredTasks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return tasks.filter((t) => {
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.assignee_name.toLowerCase().includes(q) ||
        t.project_name.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || t.status === statusFilter;
      const matchPriority = priorityFilter === "all" || t.priority === priorityFilter;
      const matchProject = projectFilter === "all" || t.project_id === projectFilter;
      return matchSearch && matchStatus && matchPriority && matchProject;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter, projectFilter]);

  // Open Form Dialog for Add
  const handleOpenAddDialog = () => {
    setEditingTask(null);
    setFormData({
      title: "",
      description: "",
      project_id: projects[0]?.id || "",
      assignee_id: teamMembers[0]?.id || "",
      priority: "medium",
      status: "To Do",
      story_points: 3,
      estimated_hours: 16,
      due_date: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    });
    setFormErrors({});
    setIsFormDialogOpen(true);
  };

  // Open Form Dialog for Edit
  const handleOpenEditDialog = (task: TaskItem) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      project_id: task.project_id,
      assignee_id: task.assignee_id,
      priority: task.priority,
      status: task.status,
      story_points: task.story_points,
      estimated_hours: task.estimated_hours,
      due_date: task.due_date,
    });
    setFormErrors({});
    setIsFormDialogOpen(true);
  };

  // View Task Details
  const handleOpenViewDialog = (task: TaskItem) => {
    setSelectedTask(task);
    setIsDetailsDialogOpen(true);
  };

  // Handle Form Input Change
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = "Task title is required.";
    if (!formData.project_id) errs.project_id = "Project selection is required.";
    if (!formData.due_date) errs.due_date = "Due date is required.";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveTask = () => {
    if (!validateForm()) return;

    const proj = projects.find((p) => p.id === formData.project_id);
    const member = teamMembers.find((m) => m.id === formData.assignee_id);

    if (editingTask) {
      updatePmsTask(editingTask.id, {
        title: formData.title,
        description: formData.description,
        project_id: formData.project_id,
        project_name: proj ? proj.name : "Project",
        assignee_id: formData.assignee_id,
        assignee_name: member ? member.name : "Unassigned",
        priority: formData.priority,
        status: formData.status,
        story_points: Number(formData.story_points) || 1,
        estimated_hours: Number(formData.estimated_hours) || 8,
        due_date: formData.due_date,
      });
    } else {
      addPmsTask({
        title: formData.title,
        description: formData.description,
        project_id: formData.project_id,
        project_name: proj ? proj.name : "Project",
        assignee_id: formData.assignee_id,
        assignee_name: member ? member.name : "Unassigned",
        priority: formData.priority,
        status: formData.status,
        story_points: Number(formData.story_points) || 1,
        estimated_hours: Number(formData.estimated_hours) || 8,
        due_date: formData.due_date,
      });
    }

    setIsFormDialogOpen(false);
  };

  const handleDeleteTask = (taskId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this task?")) {
      deletePmsTask(taskId);
      if (selectedTask?.id === taskId) {
        setIsDetailsDialogOpen(false);
      }
    }
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <Layers className="w-3.5 h-3.5 text-brand" />
            <span>Projects</span>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-foreground">Task Board</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            Tasks
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage all project tasks, sprint work items, and on-site engineering deliverables here.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleOpenAddDialog}
            className="gap-2 bg-brand hover:bg-brand/90 text-white font-semibold shadow-xs text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Filter and View Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 bg-white p-2.5 rounded-xl border shadow-xs">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, task ID, assignee..."
              className="pl-8 text-xs h-9 bg-gray-50/50"
            />
          </div>

          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-[150px] text-xs h-9 hidden sm:flex">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All Projects</SelectItem>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id} className="text-xs">
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] text-xs h-9">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All Statuses</SelectItem>
              {ALL_STATUSES.map((s) => (
                <SelectItem key={s} value={s} className="text-xs">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[130px] text-xs h-9">
              <SelectValue placeholder="Filter priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All Priorities</SelectItem>
              <SelectItem value="low" className="text-xs">Low</SelectItem>
              <SelectItem value="medium" className="text-xs">Medium</SelectItem>
              <SelectItem value="high" className="text-xs">High</SelectItem>
              <SelectItem value="urgent" className="text-xs">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 p-0.5 bg-gray-100 rounded-lg self-end md:self-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("board")}
            className={`h-8 px-2.5 text-xs gap-1.5 ${
              viewMode === "board" ? "bg-white text-gray-900 shadow-xs font-semibold" : "text-gray-500"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" /> Board
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("list")}
            className={`h-8 px-2.5 text-xs gap-1.5 ${
              viewMode === "list" ? "bg-white text-gray-900 shadow-xs font-semibold" : "text-gray-500"
            }`}
          >
            <List className="h-3.5 w-3.5" /> List
          </Button>
        </div>
      </div>

      {/* Main Content: Board or List View */}
      {viewMode === "board" ? (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {ALL_STATUSES.map((status) => {
            const columnTasks = filteredTasks.filter((t) => t.status === status);

            return (
              <div key={status} className="bg-gray-50/80 rounded-xl p-3 border space-y-3 flex flex-col">
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                      {status}
                    </span>
                    <span className="text-[10px] font-bold bg-white text-gray-600 rounded-full px-2 py-0.5 border shadow-2xs">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                {/* Column Task Cards */}
                <div className="space-y-2.5 flex-1 min-h-[300px]">
                  {columnTasks.length === 0 ? (
                    <div className="flex items-center justify-center h-32 border border-dashed rounded-lg bg-white/40">
                      <p className="text-xs text-muted-foreground">No tasks here</p>
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <Card
                        key={task.id}
                        className="bg-white border rounded-xl shadow-xs hover:border-brand/40 transition-all p-3 space-y-2.5 cursor-pointer"
                        onClick={() => handleOpenViewDialog(task)}
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <h4 className="font-semibold text-xs text-gray-900 leading-snug line-clamp-2">
                            {task.title}
                          </h4>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" className="h-6 w-6 p-0 shrink-0 text-gray-400 hover:text-gray-700">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="text-xs">
                              <DropdownMenuItem onClick={() => handleOpenViewDialog(task)}>
                                <Eye className="mr-2 h-3.5 w-3.5 text-brand" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenEditDialog(task)}>
                                <Pencil className="mr-2 h-3.5 w-3.5 text-blue-600" /> Edit Task
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel className="text-[10px] text-gray-400 font-bold uppercase">
                                Move Status
                              </DropdownMenuLabel>
                              {ALL_STATUSES.filter((s) => s !== task.status).map((nextStatus) => (
                                <DropdownMenuItem
                                  key={nextStatus}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updatePmsTaskStatus(task.id, nextStatus);
                                  }}
                                  className="text-xs gap-1.5"
                                >
                                  <ArrowRight className="h-3 w-3 text-gray-400" /> {nextStatus}
                                </DropdownMenuItem>
                              ))}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => handleDeleteTask(task.id, e)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete Task
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span className="font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-gray-700">
                            {task.id}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {task.due_date}
                          </span>
                        </div>

                        <p className="text-[11px] text-gray-500 line-clamp-1">
                          {task.project_name}
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t">
                          <Badge variant="outline" className={`text-[10px] capitalize ${priorityBadgeStyles[task.priority]}`}>
                            {task.priority}
                          </Badge>
                          <div className="flex items-center gap-1 text-[11px] font-medium text-gray-700">
                            <span className="w-5 h-5 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-[10px]">
                              {task.assignee_name.charAt(0)}
                            </span>
                            <span className="truncate max-w-[90px]">{task.assignee_name}</span>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="border rounded-xl bg-white shadow-xs overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/80">
              <TableRow>
                <TableHead className="w-[100px] text-xs font-bold text-gray-700">Task ID</TableHead>
                <TableHead className="text-xs font-bold text-gray-700">Task Title &amp; Project</TableHead>
                <TableHead className="text-xs font-bold text-gray-700">Status</TableHead>
                <TableHead className="text-xs font-bold text-gray-700">Priority</TableHead>
                <TableHead className="text-xs font-bold text-gray-700">Assignee</TableHead>
                <TableHead className="text-xs font-bold text-gray-700">Due Date</TableHead>
                <TableHead className="text-right text-xs font-bold text-gray-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-28 text-center text-xs text-muted-foreground">
                    No tasks match the selected filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-gray-50/60 cursor-pointer" onClick={() => handleOpenViewDialog(task)}>
                    <TableCell className="font-mono text-xs font-bold text-gray-800">
                      {task.id}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-xs text-gray-900">{task.title}</div>
                      <div className="text-[10px] text-gray-500">{task.project_name}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] font-bold ${statusBadgeStyles[task.status]}`}>
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] capitalize ${priorityBadgeStyles[task.priority]}`}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-gray-800">
                        <span className="w-5 h-5 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-[10px]">
                          {task.assignee_name.charAt(0)}
                        </span>
                        {task.assignee_name}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-gray-600 font-mono">
                      {task.due_date}
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-7 w-7 p-0 text-gray-400 hover:text-gray-700">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="text-xs">
                          <DropdownMenuItem onClick={() => handleOpenViewDialog(task)}>
                            <Eye className="mr-2 h-3.5 w-3.5 text-brand" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenEditDialog(task)}>
                            <Pencil className="mr-2 h-3.5 w-3.5 text-blue-600" /> Edit Task
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={(e) => handleDeleteTask(task.id, e)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete Task
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Task Form Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-lg w-[calc(100%-1.5rem)] max-h-[90vh] overflow-y-auto rounded-xl p-5">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-gray-900">
              {editingTask ? "Edit Task" : "Add New Task"}
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              {editingTask
                ? "Update task details, assignment, and status."
                : "Fill in the details to create a new task in the project backlog."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-2">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">
                Parent Project <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.project_id}
                onValueChange={(val) => handleInputChange("project_id", val)}
              >
                <SelectTrigger className="text-xs h-9">
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id} className="text-xs">
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.project_id && (
                <p className="text-[10px] text-red-500 font-medium">{formErrors.project_id}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">
                Task Title <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g. Survey plot boundary pegs for Sector B"
                className="text-xs h-9"
              />
              {formErrors.title && (
                <p className="text-[10px] text-red-500 font-medium">{formErrors.title}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Detailed specifications, notes, or execution steps..."
                className="text-xs min-h-[70px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(val: any) => handleInputChange("status", val)}
                >
                  <SelectTrigger className="text-xs h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_STATUSES.map((s) => (
                      <SelectItem key={s} value={s} className="text-xs">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">Assign To</Label>
                <Select
                  value={formData.assignee_id}
                  onValueChange={(val) => handleInputChange("assignee_id", val)}
                >
                  <SelectTrigger className="text-xs h-9">
                    <SelectValue placeholder="Select Assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((m) => (
                      <SelectItem key={m.id} value={m.id} className="text-xs">
                        {m.name} ({m.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(val: any) => handleInputChange("priority", val)}
                >
                  <SelectTrigger className="text-xs h-9 capitalize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low" className="text-xs">Low</SelectItem>
                    <SelectItem value="medium" className="text-xs">Medium</SelectItem>
                    <SelectItem value="high" className="text-xs">High</SelectItem>
                    <SelectItem value="urgent" className="text-xs text-red-600 font-bold">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">
                  Due Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => handleInputChange("due_date", e.target.value)}
                  className="text-xs h-9"
                />
                {formErrors.due_date && (
                  <p className="text-[10px] text-red-500 font-medium">{formErrors.due_date}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Story Points</Label>
                <Input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.story_points}
                  onChange={(e) => handleInputChange("story_points", e.target.value)}
                  className="text-xs h-9"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">Estimated Hours</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.estimated_hours}
                  onChange={(e) => handleInputChange("estimated_hours", e.target.value)}
                  className="text-xs h-9"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={() => setIsFormDialogOpen(false)} className="text-xs">
              Cancel
            </Button>
            <Button onClick={handleSaveTask} size="sm" className="text-xs bg-brand hover:bg-brand/90 text-white font-semibold">
              {editingTask ? "Save Changes" : "Create Task"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Task Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        {selectedTask && (
          <DialogContent className="max-w-md w-[calc(100%-1.5rem)] rounded-xl p-5">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold bg-muted px-2 py-0.5 rounded text-gray-700">
                  {selectedTask.id}
                </span>
                <Badge variant="outline" className={`text-[10px] font-bold ${statusBadgeStyles[selectedTask.status]}`}>
                  {selectedTask.status}
                </Badge>
              </div>
              <DialogTitle className="text-base font-bold text-gray-900 mt-2">
                {selectedTask.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                {selectedTask.project_name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2 text-xs">
              <div className="bg-gray-50 p-3 rounded-lg border">
                <h5 className="font-semibold text-gray-700 mb-1">Description</h5>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {selectedTask.description || "No description provided."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 bg-gray-50 rounded-lg border">
                  <span className="text-[10px] text-gray-400 block font-semibold uppercase">Assignee</span>
                  <span className="font-bold text-gray-800">{selectedTask.assignee_name}</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border">
                  <span className="text-[10px] text-gray-400 block font-semibold uppercase">Priority</span>
                  <span className="font-bold capitalize text-gray-800">{selectedTask.priority}</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border">
                  <span className="text-[10px] text-gray-400 block font-semibold uppercase">Due Date</span>
                  <span className="font-bold text-gray-800">{selectedTask.due_date}</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-lg border">
                  <span className="text-[10px] text-gray-400 block font-semibold uppercase">Story Points</span>
                  <span className="font-bold text-gray-800">{selectedTask.story_points} pts ({selectedTask.estimated_hours}h)</span>
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-between items-center sm:justify-between pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteTask(selectedTask.id)}
                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDetailsDialogOpen(false)}
                  className="text-xs"
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setIsDetailsDialogOpen(false);
                    handleOpenEditDialog(selectedTask);
                  }}
                  className="text-xs bg-brand hover:bg-brand/90 text-white font-semibold"
                >
                  <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
