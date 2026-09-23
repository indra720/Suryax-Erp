import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  LayoutGrid,
  CheckCircle,
  Plus,
  Search,
  ChevronRight,
  Eye,
  Trash2,
  Mail,
  Phone,
  Briefcase,
  Layers,
  CheckCircle2,
  Clock,
  ListTodo,
  FolderKanban,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getPmsTeamMembers,
  getPmsProjects,
  getPmsTasks,
  addPmsTeamMember,
  deletePmsTeamMember,
  TeamMember,
} from "@/lib/services/pms";

const roleColorMap: Record<string, string> = {
  "Project Manager": "bg-purple-100 text-purple-700 border-purple-200",
  "Product Owner": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Lead Architect": "bg-pink-100 text-pink-700 border-pink-200",
  "Chief Site Engineer": "bg-amber-100 text-amber-700 border-amber-200",
  "MEP & Electrical Engineer": "bg-blue-100 text-blue-700 border-blue-200",
  "Quality Assurance & Surveyor": "bg-orange-100 text-orange-700 border-orange-200",
  "Developer": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Designer": "bg-rose-100 text-rose-700 border-rose-200",
};

interface TeamViewProps {
  basePath?: string;
}

export function TeamView({ basePath = "/admin/project" }: TeamViewProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState(getPmsProjects());
  const [tasks, setTasks] = useState(getPmsTasks());

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Dialogs
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Add Member Form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Chief Site Engineer",
    department: "Civil & Project Operations",
    projects: [] as string[],
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const refreshData = () => {
    setTeamMembers(getPmsTeamMembers());
    setProjects(getPmsProjects());
    setTasks(getPmsTasks());
  };

  useEffect(() => {
    refreshData();
    const handleStorage = () => refreshData();
    window.addEventListener("vrindavan-pms-change", handleStorage);
    return () => window.removeEventListener("vrindavan-pms-change", handleStorage);
  }, []);

  const totalMembers = teamMembers.length;
  const activeProjectsCount = projects.filter((p) => p.status === "active").length;
  const tasksInProgress = tasks.filter((t) => t.status === "In Progress").length;
  const tasksCompleted = tasks.filter((t) => t.status === "Done").length;

  const filteredMembers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return teamMembers.filter((m) => {
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        (m.phone && m.phone.includes(q));
      const matchRole = roleFilter === "all" || m.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [teamMembers, searchQuery, roleFilter]);

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

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Member name is required.";
    if (!formData.email.trim() || !formData.email.includes("@"))
      errs.email = "Valid email address is required.";
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddMember = () => {
    if (!validate()) return;

    addPmsTeamMember({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "9876543099",
      role: formData.role,
      department: formData.department,
      projects: formData.projects.length > 0 ? formData.projects : ["Vrindavan Greens"],
      tasksAssigned: 0,
      completedTasks: 0,
      lastActivity: "Just now",
    });

    setIsAddDialogOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "Chief Site Engineer",
      department: "Civil & Project Operations",
      projects: [],
    });
  };

  const handleDeleteMember = (id: string, name: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove ${name} from the team?`)) {
      deletePmsTeamMember(id);
      if (selectedMember?.id === id) {
        setIsProfileDialogOpen(false);
      }
    }
  };

  const handleViewProfile = (member: TeamMember) => {
    setSelectedMember(member);
    setIsProfileDialogOpen(true);
  };

  const getMemberTasks = (memberId: string) => {
    return tasks.filter((t) => t.assignee_id === memberId);
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <LayoutGrid className="w-3.5 h-3.5 text-brand" />
            <span>Projects</span>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-foreground">Team</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            Team Management
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage your project team members, roles, work assignments, and on-ground deployment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => {
              setFormData({
                name: "",
                email: "",
                phone: "",
                role: "Chief Site Engineer",
                department: "Civil & Project Operations",
                projects: [],
              });
              setFormErrors({});
              setIsAddDialogOpen(true);
            }}
            className="gap-2 bg-brand hover:bg-brand/90 text-white font-semibold shadow-xs text-xs"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </Button>
        </div>
      </div>

      {/* 4 StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <Card className="border rounded-xl bg-white shadow-xs p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total Members</span>
            <div className="p-2 rounded-lg bg-purple-50 text-brand">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-gray-900">{totalMembers}</div>
            <p className="text-[11px] text-gray-500 mt-0.5">Members currently in your team.</p>
          </div>
        </Card>

        <Card className="border rounded-xl bg-white shadow-xs p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Active Projects</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <LayoutGrid className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-gray-900">{activeProjectsCount}</div>
            <p className="text-[11px] text-gray-500 mt-0.5">Projects with active team involvement.</p>
          </div>
        </Card>

        <Card className="border rounded-xl bg-white shadow-xs p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Tasks in Progress</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-gray-900">{tasksInProgress}</div>
            <p className="text-[11px] text-gray-500 mt-0.5">Total active tasks across the team.</p>
          </div>
        </Card>

        <Card className="border rounded-xl bg-white shadow-xs p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Completed (7 Days)</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-gray-900">{tasksCompleted}</div>
            <p className="text-[11px] text-gray-500 mt-0.5">Tasks completed in the last week.</p>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-white p-2.5 rounded-xl border shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search member name, email, role, or phone..."
            className="pl-8 text-xs h-9 bg-gray-50/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[190px] text-xs h-9">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All Roles</SelectItem>
              <SelectItem value="Project Manager" className="text-xs">Project Manager</SelectItem>
              <SelectItem value="Product Owner" className="text-xs">Product Owner</SelectItem>
              <SelectItem value="Lead Architect" className="text-xs">Lead Architect</SelectItem>
              <SelectItem value="Chief Site Engineer" className="text-xs">Chief Site Engineer</SelectItem>
              <SelectItem value="MEP & Electrical Engineer" className="text-xs">MEP & Electrical Engineer</SelectItem>
              <SelectItem value="Quality Assurance & Surveyor" className="text-xs">Quality Assurance & Surveyor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/80">
            <TableRow>
              <TableHead className="text-xs font-bold text-gray-700">Member</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 hidden sm:table-cell">Role</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 hidden md:table-cell">Email &amp; Phone</TableHead>
              <TableHead className="text-xs font-bold text-gray-700 hidden lg:table-cell">Projects</TableHead>
              <TableHead className="text-center text-xs font-bold text-gray-700 hidden sm:table-cell">Tasks</TableHead>
              <TableHead className="text-right text-xs font-bold text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-28 text-center text-xs text-muted-foreground">
                  No team members found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => (
                <TableRow
                  key={member.id}
                  className="hover:bg-gray-50/60 cursor-pointer"
                  onClick={() => handleViewProfile(member)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-brand/10 text-brand font-bold text-xs">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-xs text-gray-900">{member.name}</div>
                        <div className="text-[10px] text-gray-500 sm:hidden">{member.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-semibold ${roleColorMap[member.role] || "bg-gray-100 text-gray-700"}`}
                    >
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="text-xs text-gray-700">{member.email}</div>
                    {member.phone && (
                      <div className="text-[10px] text-gray-400 font-mono">{member.phone}</div>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {member.projects && member.projects.length > 0 ? (
                        member.projects.map((p, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[10px] font-medium"
                          >
                            {p}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400 italic">None</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    <span className="text-xs font-bold font-mono bg-muted px-2 py-0.5 rounded text-gray-700">
                      {getMemberTasks(member.id).length || member.tasksAssigned}
                    </span>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-7 w-7 p-0 text-gray-400 hover:text-gray-700">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="text-xs">
                        <DropdownMenuItem onClick={() => handleViewProfile(member)}>
                          <Eye className="mr-2 h-3.5 w-3.5 text-brand" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => handleDeleteMember(member.id, member.name, e)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-3.5 w-3.5" /> Remove Member
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

      {/* Add Team Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md w-[calc(100%-1.5rem)] rounded-xl p-5">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-gray-900">Add New Team Member</DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              Enter personal and role details to deploy a new team member to projects.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3.5 py-2">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g. Rahul Verma"
                className="text-xs h-9"
              />
              {formErrors.name && (
                <p className="text-[10px] text-red-500 font-medium">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="e.g. rahul.civil@vrindavan.com"
                className="text-xs h-9"
              />
              {formErrors.email && (
                <p className="text-[10px] text-red-500 font-medium">{formErrors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Phone Number</Label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="e.g. 9876541234"
                className="text-xs h-9"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Role</Label>
              <Select
                value={formData.role}
                onValueChange={(val) => handleInputChange("role", val)}
              >
                <SelectTrigger className="text-xs h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Project Manager" className="text-xs">Project Manager</SelectItem>
                  <SelectItem value="Product Owner" className="text-xs">Product Owner</SelectItem>
                  <SelectItem value="Lead Architect" className="text-xs">Lead Architect</SelectItem>
                  <SelectItem value="Chief Site Engineer" className="text-xs">Chief Site Engineer</SelectItem>
                  <SelectItem value="MEP & Electrical Engineer" className="text-xs">MEP & Electrical Engineer</SelectItem>
                  <SelectItem value="Quality Assurance & Surveyor" className="text-xs">Quality Assurance & Surveyor</SelectItem>
                  <SelectItem value="Developer" className="text-xs">Developer</SelectItem>
                  <SelectItem value="Designer" className="text-xs">Designer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Department</Label>
              <Input
                value={formData.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
                placeholder="e.g. Civil & Infrastructure Engineering"
                className="text-xs h-9"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" onClick={() => setIsAddDialogOpen(false)} className="text-xs">
              Cancel
            </Button>
            <Button onClick={handleAddMember} size="sm" className="text-xs bg-brand hover:bg-brand/90 text-white font-semibold">
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Member Profile Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        {selectedMember && (
          <DialogContent className="max-w-2xl w-[calc(100%-1.5rem)] max-h-[92vh] overflow-y-auto rounded-xl p-0 overflow-hidden">
            {/* Top Banner */}
            <div className="h-16 bg-gradient-to-r from-brand to-brand-hover relative">
              <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="p-5 -mt-10 space-y-4">
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-3 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                    <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                    <AvatarFallback className="text-2xl font-black bg-brand/10 text-brand">
                      {selectedMember.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedMember.name}</h3>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold ${roleColorMap[selectedMember.role] || "bg-gray-100 text-gray-700"}`}
                      >
                        {selectedMember.role}
                      </Badge>
                      <span className="text-xs text-gray-500 font-medium">
                        {selectedMember.department}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteMember(selectedMember.id, selectedMember.name)}
                    className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-600 pt-1">
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="flex items-center gap-1.5 hover:text-brand transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-brand" /> {selectedMember.email}
                </a>
                {selectedMember.phone && (
                  <span className="flex items-center gap-1.5 font-mono">
                    <Phone className="h-3.5 w-3.5 text-emerald-600" /> {selectedMember.phone}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Clock className="h-3.5 w-3.5" /> Last active: {selectedMember.lastActivity || "Today"}
                </span>
              </div>

              {/* 3 Metric StatBoxes */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-purple-50/50 rounded-xl p-3 flex flex-col items-center justify-center border border-purple-100">
                  <div className="p-1.5 rounded-full bg-purple-100 text-brand mb-1">
                    <Layers className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Projects</span>
                  <span className="text-lg font-bold text-gray-900 mt-0.5">
                    {selectedMember.projects?.length || 1}
                  </span>
                </div>

                <div className="bg-emerald-50/50 rounded-xl p-3 flex flex-col items-center justify-center border border-emerald-100">
                  <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-700 mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Completed</span>
                  <span className="text-lg font-bold text-emerald-700 mt-0.5">
                    {selectedMember.completedTasks || getMemberTasks(selectedMember.id).filter((t) => t.status === "Done").length}
                  </span>
                </div>

                <div className="bg-amber-50/50 rounded-xl p-3 flex flex-col items-center justify-center border border-amber-100">
                  <div className="p-1.5 rounded-full bg-amber-100 text-amber-700 mb-1">
                    <ListTodo className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Pending</span>
                  <span className="text-lg font-bold text-amber-700 mt-0.5">
                    {getMemberTasks(selectedMember.id).filter((t) => t.status !== "Done").length}
                  </span>
                </div>
              </div>

              {/* Task Assignments */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FolderKanban className="h-4 w-4 text-brand" />
                  Assigned Tasks ({getMemberTasks(selectedMember.id).length})
                </h4>
                <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
                  {getMemberTasks(selectedMember.id).length === 0 ? (
                    <p className="text-xs text-gray-400 italic text-center py-4">
                      No tasks currently assigned.
                    </p>
                  ) : (
                    getMemberTasks(selectedMember.id).map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-2 rounded-lg border bg-gray-50/60 hover:bg-gray-100/60 transition-colors text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              task.status === "Done"
                                ? "bg-emerald-500"
                                : task.status === "In Progress"
                                ? "bg-blue-500"
                                : "bg-gray-400"
                            }`}
                          />
                          <div>
                            <span className="font-semibold text-gray-900">{task.title}</span>
                            <span className="text-[10px] text-gray-500 block">{task.project_name}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] font-semibold">
                          {task.status}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Active Projects Grid */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-brand" />
                  Active Project Allocations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedMember.projects && selectedMember.projects.length > 0 ? (
                    selectedMember.projects.map((projName, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl border bg-gray-50/60 hover:border-brand/40 transition-all"
                      >
                        <div className="h-8 w-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                          <Briefcase className="h-4 w-4 text-brand" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="font-bold text-xs text-gray-900 block truncate">{projName}</span>
                          <span className="text-[10px] text-gray-500 font-semibold">{selectedMember.role}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">No assigned projects</p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="p-3 border-t bg-gray-50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsProfileDialogOpen(false)}
                className="text-xs ml-auto"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
