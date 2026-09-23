import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  LayoutGrid,
  ChevronRight,
  Info,
  Tags,
  CheckSquare,
  Users,
  Flag,
  BarChart3,
  Calendar,
  User,
  Trash2,
  Search,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getPmsProjects,
  getPmsSprints,
  getPmsMilestones,
  getPmsTeamMembers,
  addPmsMilestone,
  deletePmsMilestone,
  toggleMilestoneCriterion,
  Milestone,
  SuccessCriterion,
  MilestoneStatus,
} from "@/lib/services/pms";

interface MilestonesViewProps {
  basePath?: string;
}

export function MilestonesView({ basePath = "/admin/project" }: MilestonesViewProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [projects, setProjects] = useState(getPmsProjects());
  const [sprints, setSprints] = useState(getPmsSprints());
  const [teamMembers, setTeamMembers] = useState(getPmsTeamMembers());

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    project: "",
    sprint: "",
    title: "",
    code: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high" | "critical",
    due_date: "",
    owner: "",
    status: "not_started" as MilestoneStatus,
  });
  const [criteria, setCriteria] = useState<SuccessCriterion[]>([
    { id: "c-1", text: "Preliminary site inspection passed", checked: false },
    { id: "c-2", text: "Structural CAD drawings verified", checked: false },
  ]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const refreshData = () => {
    setMilestones(getPmsMilestones());
    setProjects(getPmsProjects());
    setSprints(getPmsSprints());
    setTeamMembers(getPmsTeamMembers());
  };

  useEffect(() => {
    refreshData();
    const handleStorage = () => refreshData();
    window.addEventListener("vrindavan-pms-change", handleStorage);
    return () => window.removeEventListener("vrindavan-pms-change", handleStorage);
  }, []);

  // Update auto-generated code and due date when project/sprint changes
  useEffect(() => {
    if (formData.project) {
      const proj = projects.find((p) => p.id === formData.project);
      const projCode = proj ? proj.name.substring(0, 3).toUpperCase() : "PRJ";
      let sprintCode = "GEN";
      if (formData.sprint) {
        const spr = sprints.find((s) => s.id === formData.sprint);
        if (spr) sprintCode = spr.sprint_number.replace(/\s+/g, "").toUpperCase();
      }
      const randomNum = Math.floor(100 + Math.random() * 900);
      setFormData((prev) => ({
        ...prev,
        code: `${projCode}-${sprintCode}-M-${randomNum}`,
      }));
    }
  }, [formData.project, formData.sprint, projects, sprints]);

  const availableSprints = formData.project
    ? sprints.filter((s) => s.project_id === formData.project)
    : sprints;

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

  const handleAddCriterion = () => {
    setCriteria((prev) => [
      ...prev,
      { id: `c-${Date.now()}`, text: "New Success Requirement", checked: false },
    ]);
  };

  const handleRemoveCriterion = (id: string) => {
    setCriteria((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCriterionTextChange = (id: string, text: string) => {
    setCriteria((prev) => prev.map((c) => (c.id === id ? { ...c, text } : c)));
  };

  const handleCriterionCheck = (id: string) => {
    setCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c))
    );
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.project) errors.project = "Parent project is required.";
    if (!formData.title.trim()) errors.title = "Milestone title is required.";
    if (!formData.due_date) errors.due_date = "Due date is required.";
    if (!formData.owner) errors.owner = "Milestone owner is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const proj = projects.find((p) => p.id === formData.project);
    const spr = sprints.find((s) => s.id === formData.sprint);
    const ownerMember = teamMembers.find((m) => m.id === formData.owner);

    const completedCriteria = criteria.filter((c) => c.checked).length;
    const progress =
      criteria.length > 0 ? Math.round((completedCriteria / criteria.length) * 100) : 0;

    let computedStatus: MilestoneStatus = formData.status;
    if (progress === 100) computedStatus = "completed";
    else if (progress > 0 && computedStatus === "not_started") computedStatus = "in_progress";

    addPmsMilestone({
      title: formData.title,
      code: formData.code || `ML-${Date.now().toString().slice(-4)}`,
      project: formData.project,
      project_name: proj ? proj.name : "Project",
      sprint: formData.sprint || undefined,
      sprint_name: spr ? spr.name : undefined,
      description: formData.description,
      priority: formData.priority,
      due_date: formData.due_date,
      status: computedStatus,
      progress,
      owner: formData.owner,
      owner_name: ownerMember ? ownerMember.name : "Unassigned",
      criteria,
    });

    setIsDialogOpen(false);
    setFormData({
      project: "",
      sprint: "",
      title: "",
      code: "",
      description: "",
      priority: "medium",
      due_date: "",
      owner: "",
      status: "not_started",
    });
    setCriteria([
      { id: "c-1", text: "Preliminary site inspection passed", checked: false },
      { id: "c-2", text: "Structural CAD drawings verified", checked: false },
    ]);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this milestone?")) {
      deletePmsMilestone(id);
    }
  };

  const filteredMilestones = milestones.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.project_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || m.status === statusFilter;
    const matchesProject = projectFilter === "all" || m.project === projectFilter;
    return matchesSearch && matchesStatus && matchesProject;
  });

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <LayoutGrid className="w-3.5 h-3.5 text-brand" />
            <span>Projects</span>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-foreground">Milestones</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Flag className="w-5 h-5 text-brand" />
            Milestone Management
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Define, track, and execute project deliverables, legal sanctions, and engineering checkpoints.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-brand hover:bg-brand/90 text-white font-semibold shadow-xs">
              <PlusCircle className="w-4 h-4" />
              Create Milestone
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl w-[calc(100%-1.5rem)] max-h-[92vh] overflow-y-auto rounded-xl p-5">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-gray-900">Create New Milestone</DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Define a high-level project milestone, target completion date, and success criteria.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-3">
              {/* Left Column (2 Cols) */}
              <div className="md:col-span-2 space-y-4">
                <Card className="border shadow-none">
                  <CardHeader className="p-3.5 pb-2">
                    <CardTitle className="text-xs font-bold text-gray-900 flex items-center gap-2">
                      <Info className="w-4 h-4 text-brand" /> Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3.5 pt-0 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">
                          Parent Project <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.project}
                          onValueChange={(val) => handleInputChange("project", val)}
                        >
                          <SelectTrigger className="text-xs h-9">
                            <SelectValue placeholder="Select Parent Project" />
                          </SelectTrigger>
                          <SelectContent>
                            {projects.map((p) => (
                              <SelectItem key={p.id} value={p.id} className="text-xs">
                                {p.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formErrors.project && (
                          <p className="text-[10px] text-red-500 font-medium">{formErrors.project}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs font-semibold">Parent Sprint (Optional)</Label>
                        <Select
                          value={formData.sprint}
                          onValueChange={(val) => handleInputChange("sprint", val)}
                          disabled={!formData.project}
                        >
                          <SelectTrigger className="text-xs h-9">
                            <SelectValue placeholder="Select Associated Sprint" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSprints.map((s) => (
                              <SelectItem key={s.id} value={s.id} className="text-xs">
                                {s.name} ({s.sprint_number})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-semibold">
                        Milestone Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="e.g. Land Revenue Registry Sanction Phase 1"
                        className="text-xs h-9"
                      />
                      {formErrors.title && (
                        <p className="text-[10px] text-red-500 font-medium">{formErrors.title}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-semibold">Detailed Description</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Describe the scope, deliverables, and regulatory or technical criteria..."
                        className="text-xs min-h-[70px]"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Success Criteria */}
                <Card className="border shadow-none">
                  <CardHeader className="p-3.5 pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-xs font-bold text-gray-900 flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-brand" /> Success Criteria &amp; Checkpoints
                    </CardTitle>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddCriterion}
                      className="h-7 text-xs gap-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-brand" /> Add Item
                    </Button>
                  </CardHeader>
                  <CardContent className="p-3.5 pt-0 space-y-2">
                    {criteria.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center gap-2 p-2 rounded-lg border bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                      >
                        <Checkbox
                          checked={c.checked}
                          onCheckedChange={() => handleCriterionCheck(c.id)}
                        />
                        <Input
                          value={c.text}
                          onChange={(e) => handleCriterionTextChange(c.id, e.target.value)}
                          className="h-7 text-xs border-none bg-transparent shadow-none focus-visible:ring-0 px-1"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveCriterion(c.id)}
                          className="h-6 w-6 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    ))}
                    {criteria.length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-3">
                        No success criteria added. Click "Add Item" above.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column (1 Col) */}
              <div className="space-y-4">
                <Card className="border shadow-none">
                  <CardHeader className="p-3.5 pb-2">
                    <CardTitle className="text-xs font-bold text-gray-900 flex items-center gap-2">
                      <Tags className="w-4 h-4 text-brand" /> Details &amp; Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3.5 pt-0 space-y-3">
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold">Milestone Code</Label>
                      <Input
                        value={formData.code}
                        readOnly
                        placeholder="Auto-generated"
                        className="text-xs h-9 bg-muted font-mono font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-semibold">Priority Level</Label>
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
                          <SelectItem value="critical" className="text-xs text-red-600 font-bold">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-semibold">
                        Target Due Date <span className="text-red-500">*</span>
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
                  </CardContent>
                </Card>

                <Card className="border shadow-none">
                  <CardHeader className="p-3.5 pb-2">
                    <CardTitle className="text-xs font-bold text-gray-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-brand" /> Ownership &amp; Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3.5 pt-0 space-y-3">
                    <div className="space-y-1">
                      <Label className="text-xs font-semibold">
                        Responsible Owner <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.owner}
                        onValueChange={(val) => handleInputChange("owner", val)}
                      >
                        <SelectTrigger className="text-xs h-9">
                          <SelectValue placeholder="Select Team Member" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers.map((m) => (
                            <SelectItem key={m.id} value={m.id} className="text-xs">
                              {m.name} ({m.role})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.owner && (
                        <p className="text-[10px] text-red-500 font-medium">{formErrors.owner}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs font-semibold">Initial Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(val: any) => handleInputChange("status", val)}
                      >
                        <SelectTrigger className="text-xs h-9 capitalize">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not_started" className="text-xs">Not Started</SelectItem>
                          <SelectItem value="in_progress" className="text-xs">In Progress</SelectItem>
                          <SelectItem value="blocked" className="text-xs">Blocked</SelectItem>
                          <SelectItem value="completed" className="text-xs">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-1">
                      <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                        <span>Checklist Completion</span>
                        <span>
                          {criteria.length > 0
                            ? Math.round((criteria.filter((c) => c.checked).length / criteria.length) * 100)
                            : 0}
                          %
                        </span>
                      </div>
                      <Progress
                        value={
                          criteria.length > 0
                            ? (criteria.filter((c) => c.checked).length / criteria.length) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DialogFooter className="gap-2 pt-2 border-t">
              <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(false)} className="text-xs">
                Cancel
              </Button>
              <Button onClick={handleSubmit} size="sm" className="text-xs bg-brand hover:bg-brand/90 text-white font-semibold">
                <Flag className="w-3.5 h-3.5 mr-1" /> Save Milestone
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-white p-2.5 rounded-xl border shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search milestone title, code, or project..."
            className="pl-8 text-xs h-9 bg-gray-50/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-full sm:w-[180px] text-xs h-9">
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
            <SelectTrigger className="w-full sm:w-[140px] text-xs h-9">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All Status</SelectItem>
              <SelectItem value="completed" className="text-xs">Completed</SelectItem>
              <SelectItem value="in_progress" className="text-xs">In Progress</SelectItem>
              <SelectItem value="blocked" className="text-xs">Blocked</SelectItem>
              <SelectItem value="not_started" className="text-xs">Not Started</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Existing Milestones List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-brand" />
            Existing Milestones ({filteredMilestones.length})
          </h2>
          <span className="text-[11px] text-gray-500">
            Interactive checklists: tick boxes to update live progress
          </span>
        </div>

        {filteredMilestones.length === 0 ? (
          <Card className="border border-dashed p-8 text-center bg-gray-50/50 rounded-xl">
            <Flag className="w-8 h-8 mx-auto text-gray-400 mb-2 opacity-50" />
            <p className="text-sm font-semibold text-gray-700">No milestones found</p>
            <p className="text-xs text-gray-500 mt-1">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search criteria or clear filters."
                : "Create your first project milestone using the button above."}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filteredMilestones.map((m) => {
              const priorityColor =
                m.priority === "critical"
                  ? "bg-red-100 text-red-700 border-red-200"
                  : m.priority === "high"
                  ? "bg-orange-100 text-orange-700 border-orange-200"
                  : m.priority === "medium"
                  ? "bg-blue-100 text-blue-700 border-blue-200"
                  : "bg-gray-100 text-gray-700 border-gray-200";

              const statusColor =
                m.status === "completed"
                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                  : m.status === "in_progress"
                  ? "bg-amber-100 text-amber-800 border-amber-200"
                  : m.status === "blocked"
                  ? "bg-red-100 text-red-800 border-red-200"
                  : "bg-gray-100 text-gray-700 border-gray-200";

              return (
                <Card
                  key={m.id}
                  className="border rounded-xl bg-white shadow-xs hover:border-brand/40 transition-all p-4 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] font-bold bg-muted px-2 py-0.5 rounded text-gray-700">
                          {m.code}
                        </span>
                        <h3 className="font-bold text-sm text-gray-900 leading-snug">{m.title}</h3>
                        <Badge variant="outline" className={`text-[10px] font-bold uppercase ${priorityColor}`}>
                          {m.priority}
                        </Badge>
                        <Badge variant="outline" className={`text-[10px] font-bold uppercase ${statusColor}`}>
                          {m.status.replace("_", " ")}
                        </Badge>
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-2">{m.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-500 pt-1">
                        <span className="flex items-center gap-1 font-semibold text-gray-700">
                          <LayoutGrid className="w-3.5 h-3.5 text-brand" />
                          {m.project_name}
                        </span>
                        {m.sprint_name && (
                          <span className="flex items-center gap-1 text-gray-500">
                            • {m.sprint_name}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          Owner: <span className="font-medium text-gray-700">{m.owner_name || m.owner}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          Due: <span className="font-medium text-gray-700">{m.due_date}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                      <div className="text-right">
                        <span className="text-xs font-bold font-mono text-gray-800">{m.progress}%</span>
                        <span className="text-[10px] text-gray-400 block">Completed</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleDelete(m.id, e)}
                        className="h-7 w-7 text-gray-400 hover:text-red-600"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <Progress value={m.progress} className="h-1.5" />
                  </div>

                  {/* Criteria Checklist (Interactive) */}
                  {m.criteria && m.criteria.length > 0 && (
                    <div className="pt-2 border-t mt-2">
                      <span className="text-[11px] font-semibold text-gray-600 mb-1.5 block">
                        Deliverable Criteria Checklist ({m.criteria.filter((c) => c.checked).length}/{m.criteria.length} Met)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {m.criteria.map((crit) => (
                          <label
                            key={crit.id}
                            className={`flex items-start gap-2 p-1.5 rounded-lg border text-xs cursor-pointer select-none transition-colors ${
                              crit.checked
                                ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                                : "bg-gray-50/50 border-gray-200 text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <Checkbox
                              checked={crit.checked}
                              onCheckedChange={() => toggleMilestoneCriterion(m.id, crit.id)}
                              className="mt-0.5"
                            />
                            <span className={`text-[11px] leading-tight ${crit.checked ? "line-through text-emerald-700 font-medium" : ""}`}>
                              {crit.text}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
