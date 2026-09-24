import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Settings, Trash2, Info, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/shifts/assignment")({
  component: ShiftAssignmentPage,
});

interface EmployeeShift {
  id: string;
  name: string;
  email: string;
  dept: string;
  shift: string | null;
  status: string;
}

const initialEmployees: EmployeeShift[] = [
  { id: "EMP00013", name: "Akshay", email: "akshay@gmail.com", dept: "Operations", shift: "General Day Shift", status: "Active" },
  { id: "EMP00019", name: "Himanshu Raut", email: "himanshu@gmail.com", dept: "Engineering", shift: "General Day Shift", status: "Active" },
  { id: "EMP00018", name: "Indrajeet", email: "indrajeet@gmail.com", dept: "Engineering", shift: "General Day Shift", status: "Active" },
  { id: "EMP00014", name: "Kamal", email: "kamal@gmail.com", dept: "Sales", shift: "General Day Shift", status: "Active" },
  { id: "EMP00017", name: "Lokendra", email: "lokendra@gmail.com", dept: "Sales", shift: "General Day Shift", status: "Active" },
  { id: "EMP00015", name: "Purvansh", email: "purvansh@gmail.com", dept: "Support", shift: "Morning Early Shift", status: "Active" },
  { id: "EMP00016", name: "Shailesh", email: "shailesh@gmail.com", dept: "Operations", shift: null, status: "Active" },
];

function ShiftAssignmentPage() {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<EmployeeShift[]>(initialEmployees);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [targetShift, setTargetShift] = useState("General Day Shift");

  const toggleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? employees.map(e => e.id) : []);
  };

  const toggleSelectOne = (id: string, checked: boolean) => {
    setSelectedIds(prev => checked ? [...prev, id] : prev.filter(x => x !== id));
  };

  const handleBulkAssign = () => {
    if (selectedIds.length === 0) {
      toast({ title: "No Selection", description: "Select at least one employee.", variant: "destructive" });
      return;
    }
    setEmployees(prev => prev.map(e => selectedIds.includes(e.id) ? { ...e, shift: targetShift } : e));
    toast({
      title: "Shift Assigned",
      description: `Assigned "${targetShift}" to ${selectedIds.length} employee(s).`,
    });
    setSelectedIds([]);
  };

  const handleIndividualChange = (id: string, newShift: string) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, shift: newShift } : e));
    toast({ title: "Updated", description: "Employee shift updated." });
  };

  const totalAssigned = employees.filter(e => e.shift !== null).length;
  const totalUnassigned = employees.filter(e => e.shift === null).length;

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-primary" /> Shift Assignment Matrix
          </h1>
          <p className="text-sm text-muted-foreground">Assign employees to morning, day, or custom operational shifts.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild size="sm">
            <Link to="/hr-dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/hr-dashboard/shifts/custom">
              <Settings className="mr-2 h-4 w-4" /> Manage Shifts
            </Link>
          </Button>
        </div>
      </div>

      <Card className="shadow-sm border">
        <CardContent className="p-4 sm:p-5">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            Bulk Shift Allocation
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <Select value={targetShift} onValueChange={setTargetShift}>
              <SelectTrigger className="w-full sm:w-[260px] h-9">
                <SelectValue placeholder="-- Choose a shift --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General Day Shift">General Day Shift (09:30 AM - 06:30 PM)</SelectItem>
                <SelectItem value="Morning Early Shift">Morning Early Shift (07:00 AM - 04:00 PM)</SelectItem>
                <SelectItem value="Evening Support Shift">Evening Support Shift (02:00 PM - 08:00 PM)</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" className="h-9" onClick={handleBulkAssign}>
              Assign to Selected ({selectedIds.length})
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5" /> Select rows below, choose shift from dropdown, and click "Assign to Selected".
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm overflow-hidden">
        <CardContent className="p-0 overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedIds.length === employees.length && employees.length > 0}
                    onCheckedChange={(c) => toggleSelectAll(!!c)}
                  />
                </TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Current Shift</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Shift Reassign</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map(emp => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(emp.id)}
                      onCheckedChange={(c) => toggleSelectOne(emp.id, !!c)}
                    />
                  </TableCell>
                  <TableCell><Badge variant="outline" className="font-mono text-xs">{emp.id}</Badge></TableCell>
                  <TableCell>
                    <div className="font-semibold text-sm">{emp.name}</div>
                    <div className="text-xs text-muted-foreground">{emp.email}</div>
                  </TableCell>
                  <TableCell className="text-xs">{emp.dept}</TableCell>
                  <TableCell>
                    {emp.shift ? (
                      <Badge variant="secondary" className="font-normal">{emp.shift}</Badge>
                    ) : (
                      <Badge variant="destructive" className="font-normal">Not Assigned</Badge>
                    )}
                  </TableCell>
                  <TableCell><Badge variant="default" className="text-xs">{emp.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Select defaultValue={emp.shift || "none"} onValueChange={(v) => handleIndividualChange(emp.id, v)}>
                      <SelectTrigger className="w-[180px] h-8 text-xs ml-auto">
                        <SelectValue placeholder="-- Change shift --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Day Shift">General Day Shift</SelectItem>
                        <SelectItem value="Morning Early Shift">Morning Early Shift</SelectItem>
                        <SelectItem value="Evening Support Shift">Evening Support Shift</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/40 rounded-xl border text-center">
        <div><div className="text-[10px] text-muted-foreground uppercase font-bold">Total Staff</div><div className="text-lg font-bold">{employees.length}</div></div>
        <div><div className="text-[10px] text-muted-foreground uppercase font-bold">Assigned</div><div className="text-lg font-bold text-emerald-600">{totalAssigned}</div></div>
        <div><div className="text-[10px] text-muted-foreground uppercase font-bold">Unassigned</div><div className="text-lg font-bold text-rose-600">{totalUnassigned}</div></div>
        <div><div className="text-[10px] text-muted-foreground uppercase font-bold">Selected</div><div className="text-lg font-bold text-primary">{selectedIds.length}</div></div>
      </div>
    </div>
  );
}
