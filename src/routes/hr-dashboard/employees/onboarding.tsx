import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  FileText,
  CheckCircle2,
  Clock,
  Plus,
  Eye,
  Edit,
  UserCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddEmployeeDialog, NewEmployeeRecord } from "@/components/forms/AddEmployeeDialog";
import { toast } from "sonner";

export const Route = createFileRoute("/hr-dashboard/employees/onboarding")({
  head: () => ({
    meta: [{ title: "Employee Onboarding Workflows | HR Dashboard" }],
  }),
  component: HrOnboardingPage,
});

function HrOnboardingPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [candidates, setCandidates] = useState([
    { id: 1, name: "Vikas Meena", role: "Telecaller Executive", dept: "Sales", startDate: "28 Sep 2026", progress: "80%", status: "Documentation Pending", tasksCompleted: 4, totalTasks: 5 },
    { id: 2, name: "Divya Jain", role: "Frontend Developer", dept: "Engineering", startDate: "01 Oct 2026", progress: "40%", status: "Asset Provisioning", tasksCompleted: 2, totalTasks: 5 },
    { id: 3, name: "Harish Soni", role: "Site Visit Coordinator", dept: "Sales", startDate: "05 Oct 2026", progress: "100%", status: "Completed", tasksCompleted: 5, totalTasks: 5 },
  ]);

  const handleCandidateAdded = (record: NewEmployeeRecord) => {
    const newCandidate = {
      id: Date.now(),
      name: record.name,
      role: record.role,
      dept: record.dept,
      startDate: record.joinDate,
      progress: "20%",
      status: "Documentation Pending",
      tasksCompleted: 1,
      totalTasks: 5,
    };
    setCandidates([newCandidate, ...candidates]);
    toast.success(`Candidate ${record.name} added to onboarding workflow.`);
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <UserCheck className="size-6 text-primary" />
            New Hire Onboarding Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Track document verification, IT asset allocations, and induction training.
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => setShowAddModal(true)}
          className="h-8 text-xs gap-1.5 font-semibold bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Initiate Onboarding
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="border-l-4 border-l-blue-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <span className="text-xs text-muted-foreground font-medium">In Pipeline</span>
            <h3 className="text-xl font-bold mt-1 text-foreground">{candidates.filter(c => c.status !== "Completed").length} Candidates</h3>
            <span className="text-[11px] text-muted-foreground">Joining next 10 days</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <span className="text-xs text-muted-foreground font-medium">Completed This Month</span>
            <h3 className="text-xl font-bold mt-1 text-emerald-700">6 Onboarded</h3>
            <span className="text-[11px] text-emerald-600 font-medium">100% Induction rate</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <span className="text-xs text-muted-foreground font-medium">Pending Verifications</span>
            <h3 className="text-xl font-bold mt-1 text-amber-700">3 Background Checks</h3>
            <span className="text-[11px] text-muted-foreground">Aadhar & Bank KYC</span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold">Active Onboarding Candidates</CardTitle>
          <CardDescription className="text-xs">Task checklist and onboarding progress per new joiner</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-1">
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-xs font-bold">Candidate</TableHead>
                  <TableHead className="text-xs font-bold">Role & Dept</TableHead>
                  <TableHead className="text-xs font-bold">Joining Date</TableHead>
                  <TableHead className="text-xs font-bold">Task Progress</TableHead>
                  <TableHead className="text-xs font-bold">Stage</TableHead>
                  <TableHead className="text-xs font-bold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((c) => (
                  <TableRow key={c.id} className="text-xs hover:bg-muted/30">
                    <TableCell className="font-semibold text-foreground">{c.name}</TableCell>
                    <TableCell>
                      <div>{c.role}</div>
                      <div className="text-[10px] text-muted-foreground">{c.dept}</div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{c.startDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: c.progress }} />
                        </div>
                        <span className="text-[11px] font-semibold">{c.progress}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          c.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : "bg-blue-50 text-blue-700 border-blue-300"
                        }`}
                      >
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => toast.info(`Viewing checklist for ${c.name}`)}
                      >
                        Checklist ({c.tasksCompleted}/{c.totalTasks})
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddEmployeeDialog
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onEmployeeAdded={handleCandidateAdded}
        nextEmployeeId={candidates.length + 201}
      />
    </div>
  );
}
