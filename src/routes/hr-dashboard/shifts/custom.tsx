import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, Clock, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/shifts/custom")({
  component: CustomShiftPage,
});

interface ShiftItem {
  id: number;
  name: string;
  type: string;
  start: string;
  end: string;
  employees: number;
  active: boolean;
}

const initialShifts: ShiftItem[] = [
  { id: 1, name: "General Day Shift", type: "Full Day", start: "09:30 AM", end: "06:30 PM", employees: 6, active: true },
  { id: 2, name: "Morning Early Shift", type: "Full Day", start: "07:00 AM", end: "04:00 PM", employees: 2, active: true },
  { id: 3, name: "Evening Support Shift", type: "Half Day", start: "02:00 PM", end: "08:00 PM", employees: 1, active: false },
];

function CustomShiftPage() {
  const { toast } = useToast();
  const [shifts, setShifts] = useState<ShiftItem[]>(initialShifts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("Full Day");
  const [start, setStart] = useState("09:30 AM");
  const [end, setEnd] = useState("06:30 PM");

  const handleCreate = () => {
    if (!name.trim()) return;
    const newShift: ShiftItem = {
      id: Date.now(),
      name,
      type,
      start,
      end,
      employees: 0,
      active: true,
    };
    setShifts([...shifts, newShift]);
    setName("");
    setIsDialogOpen(false);
    toast({ title: "Shift Created", description: `Shift "${newShift.name}" successfully created.` });
  };

  const handleDelete = (id: number) => {
    setShifts(shifts.filter(s => s.id !== id));
    toast({ title: "Shift Deleted", description: "Shift configuration deleted." });
  };

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" /> Shift Configuration
          </h1>
          <p className="text-sm text-muted-foreground">Create and configure employee work rosters and timings.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild size="sm">
            <Link to="/hr-dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild size="sm">
            <Link to="/hr-dashboard/shifts/assignment">
              Shift Assignment
            </Link>
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Create Shift
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[450px]">
              <DialogHeader>
                <DialogTitle>Create New Shift</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Shift Name *</label>
                  <Input placeholder="e.g. Morning, Night, General" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Shift Type *</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full Day">Full Day</SelectItem>
                      <SelectItem value="Half Day">Half Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Start Time</label>
                    <Input defaultValue={start} onChange={(e) => setStart(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">End Time</label>
                    <Input defaultValue={end} onChange={(e) => setEnd(e.target.value)} />
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="shift-active" defaultChecked />
                  <label htmlFor="shift-active" className="text-sm font-medium">Active Shift</label>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate}>Save Shift</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        {shifts.map(shift => (
          <Card key={shift.id} className="shadow-sm">
            <CardHeader className="flex flex-row justify-between items-start pb-2">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-lg font-bold">{shift.name}</CardTitle>
                <Badge variant="secondary" className="w-fit text-xs">{shift.type}</Badge>
              </div>
              <Badge variant={shift.active ? "default" : "secondary"} className="flex items-center gap-1 text-xs">
                {shift.active ? <CheckCircle className="h-3 w-3 text-emerald-400" /> : <XCircle className="h-3 w-3" />}
                {shift.active ? "Active" : "Inactive"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted-foreground mb-4 bg-muted/30 p-3 rounded-lg border">
                <div><span className="font-semibold text-foreground">Start Time:</span> {shift.start}</div>
                <div><span className="font-semibold text-foreground">End Time:</span> {shift.end}</div>
                <div><span className="font-semibold text-foreground">Employees Assigned:</span> {shift.employees}</div>
              </div>
              <div className="flex gap-2 justify-end border-t pt-3">
                <Button variant="outline" size="sm" className="h-8">
                  <Edit className="mr-1.5 h-3.5 w-3.5" /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-rose-500 hover:bg-rose-50" onClick={() => handleDelete(shift.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
