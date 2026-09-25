import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  Save,
  Check,
  X,
  Users,
  Lock,
  Building,
  KeyRound,
  RefreshCw,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings/role-mapping")({
  head: () => ({
    meta: [{ title: "Role & Permission Mapping | Vrindavan ERP" }],
  }),
  component: RoleMappingPage,
});

interface PermissionModule {
  id: string;
  name: string;
  description: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  exportData: boolean;
}

function RoleMappingPage() {
  const [selectedRole, setSelectedRole] = useState("team-leader");

  const [modules, setModules] = useState<Record<string, PermissionModule[]>>({
    "team-leader": [
      { id: "leads", name: "Calling Leads & Allocations", description: "View and distribute calling leads to team staff", view: true, create: true, edit: true, delete: false, exportData: true },
      { id: "reports", name: "Staff Productivity & Call Reports", description: "Monitor telecaller activity and follow-ups", view: true, create: false, edit: false, delete: false, exportData: true },
      { id: "projects", name: "Real Estate Inventory & Plots", description: "Browse projects, block units, and site status", view: true, create: false, edit: false, delete: false, exportData: false },
      { id: "pms", name: "PMS Tasks & Sprints", description: "Assign development and sales tasks", view: true, create: true, edit: true, delete: false, exportData: true },
      { id: "bookings", name: "Add Sell & Customer Bookings", description: "Create new plot/unit sales", view: true, create: true, edit: true, delete: false, exportData: true },
      { id: "finance", name: "Commission & Earnings", description: "Track team incentives and target milestones", view: true, create: false, edit: false, delete: false, exportData: true },
      { id: "settings", name: "System Settings & Permissions", description: "Administrative system configuration", view: false, create: false, edit: false, delete: false, exportData: false },
    ],
    "staff": [
      { id: "leads", name: "Calling Leads & Allocations", description: "View assigned leads and log call outcomes", view: true, create: false, edit: true, delete: false, exportData: false },
      { id: "reports", name: "Staff Productivity & Call Reports", description: "Own daily call metrics and scheduled visits", view: true, create: true, edit: false, delete: false, exportData: false },
      { id: "projects", name: "Real Estate Inventory & Plots", description: "View property availability for clients", view: true, create: false, edit: false, delete: false, exportData: false },
      { id: "pms", name: "PMS Tasks & Sprints", description: "Complete assigned sprint tasks", view: true, create: false, edit: true, delete: false, exportData: false },
      { id: "bookings", name: "Add Sell & Customer Bookings", description: "Submit customer booking inquiries", view: true, create: true, edit: false, delete: false, exportData: false },
      { id: "finance", name: "Commission & Earnings", description: "View monthly incentive slips", view: true, create: false, edit: false, delete: false, exportData: false },
      { id: "settings", name: "System Settings & Permissions", description: "Administrative system configuration", view: false, create: false, edit: false, delete: false, exportData: false },
    ],
    "hr": [
      { id: "leads", name: "Calling Leads & Allocations", description: "CRM leads pipeline", view: false, create: false, edit: false, delete: false, exportData: false },
      { id: "reports", name: "Staff Productivity & Call Reports", description: "Workforce attendance and audit timesheets", view: true, create: true, edit: true, delete: false, exportData: true },
      { id: "projects", name: "Real Estate Inventory & Plots", description: "View campus and location references", view: true, create: false, edit: false, delete: false, exportData: false },
      { id: "pms", name: "PMS Tasks & Sprints", description: "Project management & manpower allocation", view: true, create: true, edit: true, delete: false, exportData: true },
      { id: "bookings", name: "Add Sell & Customer Bookings", description: "Customer booking records", view: false, create: false, edit: false, delete: false, exportData: false },
      { id: "finance", name: "Payroll & Salary Structures", description: "Employee salaries, payslips, loans, and reimbursements", view: true, create: true, edit: true, delete: true, exportData: true },
      { id: "settings", name: "HR Settings & Holidays", description: "Company holidays, shifts, and HR rules", view: true, create: true, edit: true, delete: true, exportData: true },
    ],
    "associates": [
      { id: "leads", name: "Calling Leads & Allocations", description: "Direct referral leads", view: true, create: true, edit: false, delete: false, exportData: false },
      { id: "reports", name: "Staff Productivity & Call Reports", description: "Personal performance history", view: true, create: false, edit: false, delete: false, exportData: false },
      { id: "projects", name: "Real Estate Inventory & Plots", description: "Catalog of sellable plots and villas", view: true, create: false, edit: false, delete: false, exportData: false },
      { id: "pms", name: "PMS Tasks & Sprints", description: "Internal PMS", view: false, create: false, edit: false, delete: false, exportData: false },
      { id: "bookings", name: "Add Sell & Customer Bookings", description: "Submit customer referrals", view: true, create: true, edit: false, delete: false, exportData: false },
      { id: "finance", name: "Commission & Earnings", description: "Associate tree and commission payout tracking", view: true, create: false, edit: false, delete: false, exportData: true },
      { id: "settings", name: "System Settings & Permissions", description: "Administrative system configuration", view: false, create: false, edit: false, delete: false, exportData: false },
    ],
  });

  const currentList = modules[selectedRole] || [];

  const handleToggle = (id: string, field: "view" | "create" | "edit" | "delete" | "exportData") => {
    setModules((prev) => {
      const updatedRoleList = (prev[selectedRole] || []).map((m) =>
        m.id === id ? { ...m, [field]: !m[field] } : m
      );
      return { ...prev, [selectedRole]: updatedRoleList };
    });
  };

  const handleSave = () => {
    toast.success(`Role permissions for "${selectedRole.toUpperCase()}" updated successfully!`);
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <KeyRound className="size-6 text-primary" />
            Role & Feature Permission Mapping
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Configure dynamic granular module authorizations (View, Create, Edit, Delete, Export) per user role.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleSave}
            size="sm"
            className="h-8 text-xs gap-1.5 font-semibold bg-primary text-primary-foreground shadow-sm"
          >
            <Save className="h-3.5 w-3.5" />
            Save Permission Matrix
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Select Role to Configure:</span>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[180px] h-8 text-xs font-semibold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team-leader" className="text-xs">Team Leader</SelectItem>
                <SelectItem value="staff" className="text-xs">Staff / Telecaller</SelectItem>
                <SelectItem value="hr" className="text-xs">HR Manager</SelectItem>
                <SelectItem value="associates" className="text-xs">Channel Partner / Associate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Badge variant="outline" className="text-xs capitalize font-semibold bg-primary/5 text-primary border-primary/20">
            {selectedRole} Role Matrix Active
          </Badge>
        </CardHeader>

        <CardContent className="p-4 pt-3">
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-xs font-bold min-w-[220px]">Module / Resource</TableHead>
                  <TableHead className="text-xs font-bold text-center w-[90px]">View</TableHead>
                  <TableHead className="text-xs font-bold text-center w-[90px]">Create</TableHead>
                  <TableHead className="text-xs font-bold text-center w-[90px]">Edit</TableHead>
                  <TableHead className="text-xs font-bold text-center w-[90px]">Delete</TableHead>
                  <TableHead className="text-xs font-bold text-center w-[90px]">Export</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentList.map((m) => (
                  <TableRow key={m.id} className="text-xs hover:bg-muted/30">
                    <TableCell>
                      <div className="font-semibold text-foreground">{m.name}</div>
                      <div className="text-[11px] text-muted-foreground">{m.description}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={m.view}
                        onCheckedChange={() => handleToggle(m.id, "view")}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={m.create}
                        onCheckedChange={() => handleToggle(m.id, "create")}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={m.edit}
                        onCheckedChange={() => handleToggle(m.id, "edit")}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={m.delete}
                        onCheckedChange={() => handleToggle(m.id, "delete")}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={m.exportData}
                        onCheckedChange={() => handleToggle(m.id, "exportData")}
                      />
                    </TableCell>
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
