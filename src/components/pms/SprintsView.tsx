import React, { useState, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  Plus,
  Calendar,
  Target,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Filter,
  Search,
  Layers,
  History,
  Activity,
  ChevronRight,
  Users,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  getPmsSprints,
  addPmsSprint,
  getPmsProjects,
  getPmsTasks,
  updatePmsTaskStatus,
  burndownChartData,
  Sprint,
  SprintTask,
  TaskItem,
} from "@/lib/services/pms";
import { toast } from "sonner";

interface SprintsViewProps {
  basePath?: string;
}

export function SprintsView({ basePath = "/admin/project" }: SprintsViewProps) {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "backlog" | "history">("active");
  const [selectedSprintId, setSelectedSprintId] = useState<string>("SP-001");
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form state for creating sprint
  const [newSprint, setNewSprint] = useState({
    name: "",
    project_id: "PRJ-001",
    project_name: "Vrindavan Greens Plotted Township",
    sprint_number: "Sprint 17",
    sprint_type: "Development" as const,
    goal: "",
    duration_weeks: 3,
    start_date: new Date().toISOString().slice(0, 10),
    end_date: new Date(Date.now() + 21 * 86400000).toISOString().slice(0, 10),
    story_points_target: 30,
    status: "Active" as const,
    progress: 0,
  });

  const loadData = () => {
    const s = getPmsSprints();
    setSprints(s);
    setTasks(getPmsTasks());
    if (s.length > 0 && !selectedSprintId) {
      setSelectedSprintId(s[0].id);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener("vrindavan-pms-change", loadData);
    return () => window.removeEventListener("vrindavan-pms-change", loadData);
  }, []);

  const activeSprint = useMemo(() => {
    return sprints.find((s) => s.id === selectedSprintId) || sprints[0];
  }, [sprints, selectedSprintId]);

  const projects = getPmsProjects();

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSprint.name.trim()) {
      toast.error("Sprint name is required.");
      return;
    }
    const proj = projects.find((p) => p.id === newSprint.project_id);
    addPmsSprint({
      ...newSprint,
      project_name: proj ? proj.name : newSprint.project_name,
      tasks: [],
    });
    toast.success("Sprint created successfully!");
    setIsCreateOpen(false);
    setNewSprint({
      name: "",
      project_id: "PRJ-001",
      project_name: "Vrindavan Greens Plotted Township",
      sprint_number: `Sprint ${sprints.length + 15}`,
      sprint_type: "Development",
      goal: "",
      duration_weeks: 3,
      start_date: new Date().toISOString().slice(0, 10),
      end_date: new Date(Date.now() + 21 * 86400000).toISOString().slice(0, 10),
      story_points_target: 30,
      status: "Active",
      progress: 0,
    });
    loadData();
  };

  const handleMoveStatus = (taskId: string, newStatus: any) => {
    updatePmsTaskStatus(taskId, newStatus);
    toast.success(`Task status updated to ${newStatus}`);
    loadData();
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center size-8 rounded-lg bg-brand/10 text-brand font-bold text-sm">
              <Clock className="size-4 text-brand" />
            </span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                Site Development Sprints &amp; Velocity
              </h1>
              <p className="text-xs text-gray-500">
                Time-boxed development cycles for site grading, road networks, infrastructure amenities, and burndown tracking.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sprint Selector */}
          <select
            value={selectedSprintId}
            onChange={(e) => setSelectedSprintId(e.target.value)}
            className="h-8 px-2.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:border-brand font-semibold"
          >
            {sprints.map((s) => (
              <option key={s.id} value={s.id}>
                {s.sprint_number}: {s.name}
              </option>
            ))}
          </select>

          <Button
            onClick={() => setIsCreateOpen(true)}
            className="text-xs flex items-center gap-1.5 h-8 bg-brand hover:bg-brand/90 text-white"
          >
            <Plus className="size-3.5" />
            New Sprint
          </Button>
        </div>
      </div>

      {/* Active Sprint Summary & Burndown Velocity Chart */}
      {activeSprint && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Active Sprint Overview Card */}
          <Card className="border border-gray-200 rounded-xl bg-white shadow-xs p-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-brand uppercase tracking-wider">
                  {activeSprint.sprint_number} • {activeSprint.status}
                </span>
                <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                  <Clock className="size-3" /> {activeSprint.duration_weeks} Weeks Cycle
                </span>
              </div>

              <div>
                <h2 className="text-base font-bold text-gray-900 leading-snug">{activeSprint.name}</h2>
                <p className="text-[11px] text-gray-500 font-medium">{activeSprint.project_name}</p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-xs">
                <span className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Sprint Goal</span>
                <p className="text-gray-700 leading-relaxed">{activeSprint.goal}</p>
              </div>

              {/* Progress */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-600">Sprint Completion</span>
                  <span className="text-brand">{activeSprint.progress || 65}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand to-purple-600 rounded-full"
                    style={{ width: `${activeSprint.progress || 65}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t text-[11px] text-gray-600 mt-3">
              <div>
                <span className="text-gray-400 block text-[10px]">Timeline:</span>
                <span className="font-semibold text-gray-800">{activeSprint.start_date} → {activeSprint.end_date}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-400 block text-[10px]">Story Points Target:</span>
                <span className="font-black text-brand text-sm">{activeSprint.story_points_target} pts</span>
              </div>
            </div>
          </Card>

          {/* Sprint Burndown Velocity Chart */}
          <Card className="lg:col-span-2 border border-gray-200 rounded-xl bg-white shadow-xs p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                  <TrendingUp className="size-4 text-brand" />
                  Sprint Burndown Velocity
                </h3>
                <p className="text-[11px] text-gray-500">Remaining story points vs ideal burn trajectory</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <span className="size-2 rounded-full bg-gray-300" /> Ideal Burn
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand">
                  <span className="size-2 rounded-full bg-brand" /> Actual Burn
                </div>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={burndownChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f20d8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#4f20d8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#1e1b4b",
                      borderRadius: "8px",
                      border: "none",
                      color: "#fff",
                      fontSize: "11px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#4f20d8"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#actualGrad)"
                    name="Actual Story Points"
                  />
                  <Area
                    type="monotone"
                    dataKey="ideal"
                    stroke="#cbd5e1"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="none"
                    name="Ideal Trajectory"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      )}

      {/* Tabs Toolbar */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === "active" ? "bg-brand text-white shadow-xs" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Sprint Task Board ({tasks.length})
          </button>
          <button
            onClick={() => setActiveTab("backlog")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === "backlog" ? "bg-brand text-white shadow-xs" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Backlog Tasks
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === "history" ? "bg-brand text-white shadow-xs" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Sprints ({sprints.length})
          </button>
        </div>

        <div className="relative w-64 hidden sm:block">
          <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs bg-white border-gray-200"
          />
        </div>
      </div>

      {/* Tab 1: Sprint Task Board */}
      {activeTab === "active" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {(["To Do", "In Progress", "Review", "Done"] as const).map((status) => {
            const colTasks = tasks.filter(
              (t) =>
                t.status === status &&
                (!search || t.title.toLowerCase().includes(search.toLowerCase()))
            );

            return (
              <div key={status} className="bg-gray-50/70 border rounded-xl p-3 space-y-2.5 min-h-[300px]">
                <div className="flex items-center justify-between pb-2 border-b">
                  <span className="text-xs font-bold text-gray-700">{status}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-gray-600 border">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {colTasks.map((task) => (
                    <Card key={task.id} className="p-3 bg-white border shadow-2xs space-y-2 hover:border-brand/40 transition-colors">
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-mono text-[9px] font-bold text-gray-400">{task.id}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                            task.priority === "urgent"
                              ? "bg-rose-100 text-rose-700"
                              : task.priority === "high"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-gray-900 leading-snug">{task.title}</h4>
                      <p className="text-[10px] text-gray-500 line-clamp-1">{task.project_name}</p>

                      <div className="flex items-center justify-between pt-1 border-t text-[10px]">
                        <span className="text-gray-600 font-medium">{task.assignee_name}</span>
                        <span className="font-bold text-brand bg-brand/10 px-1.5 py-0.5 rounded">
                          {task.story_points} pts
                        </span>
                      </div>

                      {/* Quick Move Action */}
                      <div className="pt-1 flex items-center justify-end gap-1">
                        {status !== "Done" && (
                          <button
                            onClick={() =>
                              handleMoveStatus(
                                task.id,
                                status === "To Do"
                                    ? "In Progress"
                                    : status === "In Progress"
                                    ? "Review"
                                    : "Done"
                              )
                            }
                            className="text-[9px] font-bold text-brand hover:underline flex items-center gap-0.5"
                          >
                            Advance <ArrowRight className="size-2.5" />
                          </button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Backlog Tasks */}
      {activeTab === "backlog" && (
        <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="text-sm font-bold text-gray-900">Project Backlog Tasks Pool</h3>
            <p className="text-xs text-gray-500">Unassigned task inventory available for upcoming sprint planning</p>
          </div>
          <div className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <div key={task.id} className="p-3.5 flex items-center justify-between hover:bg-gray-50/70 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-gray-400">{task.id}</span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{task.title}</h4>
                    <p className="text-[11px] text-gray-500">{task.project_name} • Assignee: {task.assignee_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-500">{task.due_date}</span>
                  <span className="text-xs font-bold text-brand bg-brand/10 px-2 py-0.5 rounded">
                    {task.story_points} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Tab 3: All Sprints History */}
      {activeTab === "history" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sprints.map((s) => (
            <Card key={s.id} className="p-4 border rounded-xl bg-white shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand bg-brand/10 px-2 py-0.5 rounded">
                  {s.sprint_number}
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase">{s.status}</span>
              </div>
              <h4 className="text-sm font-bold text-gray-900">{s.name}</h4>
              <p className="text-xs text-gray-600 line-clamp-2">{s.goal}</p>
              <div className="text-[11px] text-gray-500 pt-2 border-t flex justify-between">
                <span>{s.start_date} → {s.end_date}</span>
                <span className="font-bold text-gray-800">{s.story_points_target} pts</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Sprint Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-lg p-5 rounded-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-gray-900">Create Development Sprint</DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              Define sprint objectives, story points targets, and duration.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs mt-2">
            <div>
              <Label className="font-semibold text-gray-700">Sprint Title *</Label>
              <Input
                required
                placeholder="e.g. Sprint 17: Stormwater Curb Gutters"
                value={newSprint.name}
                onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-semibold text-gray-700">Project</Label>
                <select
                  value={newSprint.project_id}
                  onChange={(e) => setNewSprint({ ...newSprint, project_id: e.target.value })}
                  className="mt-1 w-full h-9 px-2.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-700 outline-none"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="font-semibold text-gray-700">Sprint Type</Label>
                <select
                  value={newSprint.sprint_type}
                  onChange={(e) => setNewSprint({ ...newSprint, sprint_type: e.target.value as any })}
                  className="mt-1 w-full h-9 px-2.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-700 outline-none"
                >
                  <option value="Development">Development</option>
                  <option value="Planning">Planning</option>
                  <option value="Testing">Testing &amp; QA</option>
                  <option value="Release">Release Handover</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label className="font-semibold text-gray-700">Start Date</Label>
                <Input
                  type="date"
                  value={newSprint.start_date}
                  onChange={(e) => setNewSprint({ ...newSprint, start_date: e.target.value })}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div>
                <Label className="font-semibold text-gray-700">End Date</Label>
                <Input
                  type="date"
                  value={newSprint.end_date}
                  onChange={(e) => setNewSprint({ ...newSprint, end_date: e.target.value })}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div>
                <Label className="font-semibold text-gray-700">Points Target</Label>
                <Input
                  type="number"
                  value={newSprint.story_points_target}
                  onChange={(e) => setNewSprint({ ...newSprint, story_points_target: Number(e.target.value) })}
                  className="mt-1 h-9 text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="font-semibold text-gray-700">Sprint Goal &amp; Deliverables</Label>
              <Textarea
                rows={3}
                placeholder="Key outcomes to be delivered during this sprint cycle..."
                value={newSprint.goal}
                onChange={(e) => setNewSprint({ ...newSprint, goal: e.target.value })}
                className="mt-1 text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white hover:bg-brand/90">
                Create Sprint
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
