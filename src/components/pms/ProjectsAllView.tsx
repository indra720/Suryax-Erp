import React, { useState, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  FolderKanban,
  CheckSquare,
  Clock,
  ClipboardList,
  Search,
  Plus,
  LayoutGrid,
  List,
  Building2,
  Calendar,
  IndianRupee,
  Users,
  ArrowUpDown,
  Filter,
  Eye,
  CheckCircle2,
} from "lucide-react";
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
  getPmsProjects,
  addPmsProject,
  Project,
  ProjectStatus,
} from "@/lib/services/pms";
import { toast } from "sonner";

interface ProjectsAllViewProps {
  basePath?: string;
}

export function ProjectsAllView({ basePath = "/admin/project" }: ProjectsAllViewProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | "all">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "progress" | "startDate">("name");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form state
  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    budget: 5000000,
    status: "active" as ProjectStatus,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date(Date.now() + 180 * 86400000).toISOString().slice(0, 10),
    description: "",
    progress: 10,
  });

  const loadProjects = () => {
    setProjects(getPmsProjects());
  };

  useEffect(() => {
    loadProjects();
    window.addEventListener("vrindavan-pms-change", loadProjects);
    return () => window.removeEventListener("vrindavan-pms-change", loadProjects);
  }, []);

  // Compute stat counts
  const totalProjects = projects.length;
  const activeCount = projects.filter((p) => p.status === "active").length;
  const completedCount = projects.filter((p) => p.status === "completed").length;
  const plannedCount = projects.filter((p) => p.status === "planned").length;

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        const matchesStatus = activeFilter === "all" || p.status === activeFilter;
        const matchesSearch =
          !search.trim() ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.client.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "progress") return b.progress - a.progress;
        if (sortBy === "startDate") return a.startDate.localeCompare(b.startDate);
        return 0;
      });
  }, [projects, activeFilter, search, sortBy]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name.trim()) {
      toast.error("Project name is required.");
      return;
    }
    addPmsProject({
      ...newProject,
      members: [],
    });
    toast.success("Project created successfully!");
    setIsCreateOpen(false);
    setNewProject({
      name: "",
      client: "",
      budget: 5000000,
      status: "active",
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(Date.now() + 180 * 86400000).toISOString().slice(0, 10),
      description: "",
      progress: 10,
    });
    loadProjects();
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center size-8 rounded-lg bg-brand/10 text-brand font-bold text-sm">
              <FolderKanban className="size-4 text-brand" />
            </span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
                Township &amp; Construction Projects
              </h1>
              <p className="text-xs text-gray-500">
                Manage and track all real estate township projects, infrastructure amenities, and development progress.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          className="text-xs flex items-center gap-1.5 h-8 bg-brand hover:bg-brand/90 text-white"
        >
          <Plus className="size-3.5" />
          Create Project
        </Button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border border-gray-200 rounded-xl bg-white shadow-xs p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600">Total Projects</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <FolderKanban className="size-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">{totalProjects}</div>
          <p className="text-[10px] text-gray-500 mt-0.5">Across all townships</p>
        </Card>

        <Card className="border border-gray-200 rounded-xl bg-white shadow-xs p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600">Active Projects</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckSquare className="size-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-2">{activeCount}</div>
          <p className="text-[10px] text-gray-500 mt-0.5">Under active development</p>
        </Card>

        <Card className="border border-gray-200 rounded-xl bg-white shadow-xs p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600">Completed Projects</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Clock className="size-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-600 mt-2">{completedCount}</div>
          <p className="text-[10px] text-gray-500 mt-0.5">Delivered &amp; handed over</p>
        </Card>

        <Card className="border border-gray-200 rounded-xl bg-white shadow-xs p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600">Planned Projects</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <ClipboardList className="size-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 mt-2">{plannedCount}</div>
          <p className="text-[10px] text-gray-500 mt-0.5">In survey &amp; layout design</p>
        </Card>
      </div>

      {/* Filter, Search & View Controls */}
      <Card className="border border-gray-200 rounded-xl bg-white shadow-xs p-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search projects by name or client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-8 text-xs bg-white border-gray-200"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200 text-xs">
            {(["all", "active", "planned", "completed", "on-hold"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setActiveFilter(st)}
                className={`px-3 py-1 rounded-md font-semibold capitalize transition-colors ${
                  activeFilter === st
                    ? "bg-white text-brand shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {st === "all" ? "All Projects" : st.replace("-", " ")}
              </button>
            ))}
          </div>

          {/* Sort & Grid/List Toggle */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-8 px-2.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-700 outline-none focus:border-brand"
            >
              <option value="name">Sort by Name</option>
              <option value="progress">Sort by Progress</option>
              <option value="startDate">Sort by Start Date</option>
            </select>

            <div className="flex items-center border rounded-lg bg-gray-50 p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "grid" ? "bg-white text-brand shadow-xs" : "text-gray-400 hover:text-gray-700"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="size-3.5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "list" ? "bg-white text-brand shadow-xs" : "text-gray-400 hover:text-gray-700"
                }`}
                title="List View"
              >
                <List className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Projects Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((p) => (
            <Card
              key={p.id}
              className="border border-gray-200 rounded-xl bg-white shadow-xs p-4 flex flex-col justify-between hover:border-brand/40 transition-all hover:shadow-md"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{p.name}</h3>
                    <p className="text-[11px] text-gray-500 font-medium">{p.client}</p>
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

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{p.description}</p>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-gray-600">
                    <span>Development Progress</span>
                    <span className="text-brand">{p.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand to-purple-600 rounded-full"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-500 pt-2 border-t">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Start Date:</span>
                    <span className="font-semibold text-gray-700">{p.startDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Target Completion:</span>
                    <span className="font-semibold text-gray-700">{p.endDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t text-xs">
                <div className="flex items-center gap-1 text-[11px] font-bold text-gray-800">
                  <IndianRupee className="size-3.5 text-brand" />
                  <span>₹{(p.budget / 100000).toFixed(1)} Lakh Budget</span>
                </div>
                <div className="flex -space-x-1.5 overflow-hidden">
                  {p.members?.slice(0, 3).map((m) => (
                    <div
                      key={m.id}
                      title={`${m.name} (${m.role})`}
                      className="size-6 rounded-full bg-brand/10 border-2 border-white flex items-center justify-center text-[9px] font-bold text-brand"
                    >
                      {m.name.slice(0, 2).toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Projects List View */}
      {viewMode === "list" && (
        <Card className="border border-gray-200 rounded-xl bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b text-gray-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">Project Name</th>
                  <th className="px-4 py-3">Client / Owner</th>
                  <th className="px-4 py-3">Budget</th>
                  <th className="px-4 py-3">Timeline</th>
                  <th className="px-4 py-3">Progress</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3 font-bold text-gray-900">{p.name}</td>
                    <td className="px-4 py-3 text-gray-600">{p.client}</td>
                    <td className="px-4 py-3 font-mono font-semibold text-gray-800">
                      ₹{(p.budget / 100000).toFixed(1)} L
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-gray-500">
                      {p.startDate} → {p.endDate}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand rounded-full"
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                        <span className="font-bold text-[11px] text-brand">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : p.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Create Project Modal Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-lg p-5 rounded-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-gray-900">Create New Township Project</DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              Enter project specifications, client details, and development timelines.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs mt-2">
            <div>
              <Label className="font-semibold text-gray-700">Project Name *</Label>
              <Input
                required
                placeholder="e.g. Vrindavan Greens Phase-3"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="mt-1 h-9 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-semibold text-gray-700">Client / Developer</Label>
                <Input
                  placeholder="e.g. Vrindavan Infra"
                  value={newProject.client}
                  onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div>
                <Label className="font-semibold text-gray-700">Budget (₹)</Label>
                <Input
                  type="number"
                  value={newProject.budget}
                  onChange={(e) => setNewProject({ ...newProject, budget: Number(e.target.value) })}
                  className="mt-1 h-9 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-semibold text-gray-700">Start Date</Label>
                <Input
                  type="date"
                  value={newProject.startDate}
                  onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                  className="mt-1 h-9 text-xs"
                />
              </div>
              <div>
                <Label className="font-semibold text-gray-700">Target End Date</Label>
                <Input
                  type="date"
                  value={newProject.endDate}
                  onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                  className="mt-1 h-9 text-xs"
                />
              </div>
            </div>

            <div>
              <Label className="font-semibold text-gray-700">Initial Status</Label>
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                className="mt-1 w-full h-9 px-2.5 text-xs rounded-lg border border-gray-200 bg-white text-gray-700 outline-none"
              >
                <option value="active">Active Development</option>
                <option value="planned">Planned / In Survey</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            <div>
              <Label className="font-semibold text-gray-700">Project Description</Label>
              <Textarea
                rows={3}
                placeholder="Scope of work, township master layout details..."
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="mt-1 text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-brand text-white hover:bg-brand/90">
                Save Project
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
