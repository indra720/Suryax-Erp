import React, { useState, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Presentation,
  FolderKanban,
  CheckSquare,
  Users,
  Clock,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Plus,
  RefreshCw,
  CheckCircle2,
  Building2,
  Briefcase,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getPmsProjects,
  getPmsTasks,
  getPmsTeamMembers,
  Project,
  TaskItem,
  TeamMember,
} from "@/lib/services/pms";

const PIE_COLORS = {
  "To Do": "#3b82f6",
  "In Progress": "#f59e0b",
  "Review": "#8b5cf6",
  "Done": "#10b981",
  "Blocked": "#ef4444",
};

interface PmsDashboardViewProps {
  basePath?: string;
}

export function PmsDashboardView({ basePath = "/admin/project" }: PmsDashboardViewProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    setProjects(getPmsProjects());
    setTasks(getPmsTasks());
    setMembers(getPmsTeamMembers());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    window.addEventListener("vrindavan-pms-change", loadData);
    return () => window.removeEventListener("vrindavan-pms-change", loadData);
  }, []);

  // Compute Stats
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedTasks = tasks.filter((t) => t.status === "Done").length;
  const totalTasks = tasks.length;
  const totalHours = tasks.reduce((sum, t) => sum + (t.estimated_hours || 0), 0);

  // Task Status Overview for Donut Chart
  const statusCounts = useMemo(() => {
    const map: Record<string, number> = {
      "To Do": 0,
      "In Progress": 0,
      "Review": 0,
      "Done": 0,
      "Blocked": 0,
    };
    tasks.forEach((t) => {
      if (map[t.status] !== undefined) map[t.status]++;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [tasks]);

  // Upcoming Deadlines (sorted by due date)
  const upcomingDeadlines = useMemo(() => {
    return [...tasks]
      .filter((t) => t.status !== "Done")
      .sort((a, b) => (a.due_date > b.due_date ? 1 : -1))
      .slice(0, 5);
  }, [tasks]);

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Top Banner & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center size-8 rounded-lg bg-brand/10 text-brand font-bold text-sm">
              <Presentation className="size-4 text-brand" />
            </span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                PMS Project Management Dashboard
                <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                  Live Operations
                </span>
              </h1>
              <p className="text-xs text-gray-500">
                Track real estate township site development, engineering sprints, construction milestones, and task boards.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            className="text-xs flex items-center gap-1.5 h-8 border-gray-200"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button
            asChild
            size="sm"
            className="text-xs flex items-center gap-1.5 h-8 bg-brand hover:bg-brand/90 text-white"
          >
            <Link to={`${basePath}/all`}>
              <Plus className="size-3.5" />
              New Project
            </Link>
          </Button>
        </div>
      </div>

      {/* 4 Top KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border border-gray-200 rounded-xl bg-white shadow-xs p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600">Total Projects</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <FolderKanban className="size-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">{totalProjects}</div>
          <p className="text-[10px] text-gray-500 mt-0.5">
            <span className="text-emerald-600 font-semibold">{activeProjects} Active</span> • {totalProjects - activeProjects} Planned/Completed
          </p>
        </Card>

        <Card className="border border-gray-200 rounded-xl bg-white shadow-xs p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600">Active Tasks</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <CheckSquare className="size-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">{totalTasks}</div>
          <p className="text-[10px] text-gray-500 mt-0.5">
            <span className="text-emerald-600 font-semibold">{completedTasks} Completed</span> • {totalTasks - completedTasks} Pending
          </p>
        </Card>

        <Card className="border border-gray-200 rounded-xl bg-white shadow-xs p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600">Team Headcount</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Users className="size-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">{members.length}</div>
          <p className="text-[10px] text-gray-500 mt-0.5">
            Engineers, PMs &amp; Surveyors
          </p>
        </Card>

        <Card className="border border-gray-200 rounded-xl bg-white shadow-xs p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600">Hours Estimated</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="size-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">{totalHours} hrs</div>
          <p className="text-[10px] text-gray-500 mt-0.5">
            Across ongoing sprints
          </p>
        </Card>
      </div>

      {/* Middle Grid: Active Projects + Task Status Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Projects Cards List */}
        <Card className="lg:col-span-2 border border-gray-200 rounded-xl bg-white shadow-xs p-4">
          <div className="flex items-center justify-between mb-3 border-b pb-2">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Active Township &amp; Infra Projects</h2>
              <p className="text-[11px] text-gray-500">Live development milestones and budget allocations</p>
            </div>
            <Link
              to={`${basePath}/all`}
              className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-xl border border-gray-100 hover:border-brand/40 bg-gray-50/40 hover:bg-white transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 line-clamp-1">{p.name}</h3>
                    <p className="text-[10px] text-gray-500">{p.client}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      p.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : p.status === "completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <p className="text-[11px] text-gray-600 line-clamp-2">{p.description}</p>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-gray-500 mb-1">
                    <span>Progress</span>
                    <span className="text-brand">{p.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand to-purple-600 rounded-full"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t text-[10px] text-gray-500">
                  <span>Budget: ₹{(p.budget / 100000).toFixed(1)} Lakh</span>
                  <span>Due: {p.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Task Status Overview Donut Chart */}
        <Card className="border border-gray-200 rounded-xl bg-white shadow-xs p-4">
          <div className="mb-2 border-b pb-2">
            <h2 className="text-sm font-bold text-gray-900">Task Status Overview</h2>
            <p className="text-[11px] text-gray-500">Breakdown of operational workload</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={statusCounts}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                >
                  {statusCounts.map((entry) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={PIE_COLORS[entry.name as keyof typeof PIE_COLORS] || "#94a3b8"}
                    />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#1e1b4b",
                    borderRadius: "8px",
                    border: "none",
                    color: "#fff",
                    fontSize: "11px",
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-1.5 mt-2 pt-2 border-t">
            {statusCounts.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-[11px] px-2 py-1 rounded bg-gray-50">
                <div className="flex items-center gap-1.5">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: PIE_COLORS[s.name as keyof typeof PIE_COLORS] || "#94a3b8" }}
                  />
                  <span className="text-gray-600 font-medium">{s.name}</span>
                </div>
                <span className="font-bold text-gray-900">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Grid: Active Tasks Table + Upcoming Deadlines & Team Workload */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Tasks Table */}
        <Card className="lg:col-span-2 border border-gray-200 rounded-xl bg-white shadow-xs p-4">
          <div className="flex items-center justify-between mb-3 border-b pb-2">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Recent Engineering &amp; Site Tasks</h2>
              <p className="text-[11px] text-gray-500">Live task progression across site sectors</p>
            </div>
            <Link
              to={`${basePath}/tasks`}
              className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
            >
              Task Board <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b text-gray-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="px-3 py-2">Task</th>
                  <th className="px-3 py-2">Project</th>
                  <th className="px-3 py-2">Assignee</th>
                  <th className="px-3 py-2">Priority</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2 text-right">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tasks.slice(0, 6).map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-3 py-2.5 font-bold text-gray-900 line-clamp-1 max-w-[200px]">
                      {t.title}
                    </td>
                    <td className="px-3 py-2.5 text-gray-500 truncate max-w-[140px] text-[11px]">
                      {t.project_name}
                    </td>
                    <td className="px-3 py-2.5 font-medium text-gray-700 text-[11px]">
                      {t.assignee_name}
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          t.priority === "urgent"
                            ? "bg-rose-100 text-rose-700"
                            : t.priority === "high"
                            ? "bg-orange-100 text-orange-700"
                            : t.priority === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === "Done"
                            ? "bg-emerald-100 text-emerald-700"
                            : t.status === "In Progress"
                            ? "bg-amber-100 text-amber-700"
                            : t.status === "Blocked"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right font-mono text-[11px] text-gray-500">
                      {t.due_date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Upcoming Deadlines & Workload */}
        <div className="space-y-4">
          <Card className="border border-gray-200 rounded-xl bg-white shadow-xs p-4">
            <div className="flex items-center justify-between mb-3 border-b pb-2">
              <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <Calendar className="size-3.5 text-rose-500" />
                Upcoming Deadlines
              </h3>
              <span className="text-[10px] text-gray-400 font-semibold">Priority Queue</span>
            </div>

            <div className="space-y-2 text-xs">
              {upcomingDeadlines.map((t) => (
                <div key={t.id} className="p-2.5 rounded-lg border bg-gray-50/50 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 text-[11px] truncate">{t.title}</p>
                    <p className="text-[10px] text-gray-500">{t.assignee_name}</p>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-rose-600 shrink-0 bg-rose-50 px-2 py-0.5 rounded">
                    {t.due_date}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border border-gray-200 rounded-xl bg-white shadow-xs p-4">
            <div className="flex items-center justify-between mb-3 border-b pb-2">
              <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <Users className="size-3.5 text-brand" />
                Resource Workload
              </h3>
              <Link to={`${basePath}/team`} className="text-[10px] text-brand hover:underline font-semibold">
                Manage Team
              </Link>
            </div>

            <div className="space-y-2.5 text-xs">
              {members.slice(0, 4).map((m) => (
                <div key={m.id} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-gray-800">{m.name}</span>
                    <span className="text-gray-500">{m.tasksAssigned} tasks</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand rounded-full"
                      style={{ width: `${Math.min(100, m.tasksAssigned * 12)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
