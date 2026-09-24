import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/attendance/leave-type")({
  component: LeaveTypesPage,
});

interface LeaveType {
  id: string;
  name: string;
  code: string;
  desc: string;
  category: string;
  accrual: string;
  limit: string;
  cap: string;
  carry: boolean;
  minService: string;
  gender: string;
  doc: boolean;
  active: boolean;
}

const initialLeaveTypes: LeaveType[] = [
  {
    id: "1",
    name: "Casual Leave",
    code: "CL",
    desc: "Casual personal leave for short unplanned absences.",
    category: "paid",
    accrual: "1.00",
    limit: "12",
    cap: "5.00",
    carry: true,
    minService: "0",
    gender: "all",
    doc: false,
    active: true,
  },
  {
    id: "2",
    name: "Sick Leave",
    code: "SL",
    desc: "Medical recovery leave requiring physician certificate if > 2 days.",
    category: "paid",
    accrual: "1.00",
    limit: "10",
    cap: "7.00",
    carry: false,
    minService: "30",
    gender: "all",
    doc: true,
    active: true,
  },
  {
    id: "3",
    name: "Earned Leave",
    code: "EL",
    desc: "Privileged earned annual leave accrued upon completed tenure.",
    category: "paid",
    accrual: "1.50",
    limit: "18",
    cap: "15.00",
    carry: true,
    minService: "180",
    gender: "all",
    doc: false,
    active: true,
  },
];

function LeaveTypesPage() {
  const { toast } = useToast();
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>(initialLeaveTypes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState<LeaveType | null>(null);

  const openCreateDialog = () => {
    setSelectedLeaveType(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: LeaveType) => {
    setSelectedLeaveType(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setLeaveTypes(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Leave Policy Removed",
      description: "Leave type has been successfully deleted.",
    });
  };

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leave Types & Policies</h1>
          <p className="text-sm text-muted-foreground">
            Configure leave categories, monthly accrual quotas, and carry-forward rules.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild size="sm">
            <Link to="/hr-dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
            </Link>
          </Button>
          <Button size="sm" onClick={openCreateDialog} className="gap-2">
            <Plus className="h-4 w-4" /> Add Leave Type
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {leaveTypes.map((lt) => (
          <Card key={lt.id} className="shadow-sm border">
            <CardContent className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">{lt.name}</h3>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted font-bold text-muted-foreground">
                      {lt.code}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{lt.desc}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {lt.accrual} day(s) / monthly
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {lt.active ? "Active" : "Disabled"}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                    onClick={() => openEditDialog(lt)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-rose-500 hover:bg-rose-50"
                    onClick={() => handleDelete(lt.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                <div className="rounded-lg border bg-muted/30 p-2.5">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Annual Limit</p>
                  <p className="mt-1 text-sm font-bold">{lt.limit ? `${lt.limit} days` : "No limit"}</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-2.5">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Max Balance Cap</p>
                  <p className="mt-1 text-sm font-bold">{lt.cap}</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-2.5">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Carry Forward</p>
                  <p className="mt-1 text-sm font-bold">{lt.carry ? "Yes" : "No"}</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-2.5">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Min Service Days</p>
                  <p className="mt-1 text-sm font-bold">{lt.minService} days</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-2.5">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Gender</p>
                  <p className="mt-1 text-sm font-bold uppercase">{lt.gender}</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-2.5">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">Document Required</p>
                  <p className="mt-1 text-sm font-bold">{lt.doc ? "Yes" : "No"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <LeaveTypeFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialData={selectedLeaveType}
        onSave={(data) => {
          if (selectedLeaveType) {
            setLeaveTypes(prev => prev.map(item => item.id === selectedLeaveType.id ? { ...item, ...data } : item));
            toast({ title: "Updated", description: "Leave policy updated successfully." });
          } else {
            const newItem: LeaveType = {
              id: String(Date.now()),
              name: data.name || "Custom Leave",
              code: data.code || "CL",
              desc: data.desc || "Custom leave policy",
              category: data.category || "paid",
              accrual: data.accrual || "1.00",
              limit: data.limit || "12",
              cap: data.cap || "5.00",
              carry: data.carry ?? true,
              minService: data.minService || "0",
              gender: data.gender || "all",
              doc: data.doc ?? false,
              active: true,
            };
            setLeaveTypes(prev => [...prev, newItem]);
            toast({ title: "Created", description: "New leave policy created successfully." });
          }
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}

function LeaveTypeFormDialog({
  open,
  onOpenChange,
  initialData,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: LeaveType | null;
  onSave: (data: Partial<LeaveType>) => void;
}) {
  const [formData, setFormData] = useState<Partial<LeaveType>>({});

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px] w-full">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Leave Policy" : "Create Leave Policy"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3.5 py-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Name *</Label>
              <Input
                placeholder="e.g. Earned Leave"
                defaultValue={initialData?.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Code *</Label>
              <Input
                placeholder="e.g. EL"
                defaultValue={initialData?.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Description</Label>
            <Textarea
              rows={2}
              defaultValue={initialData?.desc}
              onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Category</Label>
            <Select defaultValue={initialData?.category || "paid"}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid Leave</SelectItem>
                <SelectItem value="unpaid">Unpaid Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Accrual Frequency</Label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue placeholder="Monthly" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Accrual Amount (days)</Label>
              <Input
                type="number"
                step="0.5"
                defaultValue={initialData?.accrual || "1.00"}
                onChange={(e) => setFormData(prev => ({ ...prev, accrual: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Annual Limit</Label>
              <Input
                type="number"
                defaultValue={initialData?.limit || "12"}
                onChange={(e) => setFormData(prev => ({ ...prev, limit: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Max Balance Cap</Label>
              <Input
                type="number"
                defaultValue={initialData?.cap || "5.00"}
                onChange={(e) => setFormData(prev => ({ ...prev, cap: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Min Service (Days)</Label>
              <Input
                type="number"
                defaultValue={initialData?.minService || "0"}
                onChange={(e) => setFormData(prev => ({ ...prev, minService: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <Label className="text-sm">Allow Carry Forward</Label>
            <Switch defaultChecked={initialData?.carry ?? true} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm">Requires Supporting Document</Label>
            <Switch defaultChecked={initialData?.doc ?? false} />
          </div>
        </div>
        <Button className="w-full mt-2" onClick={() => onSave(formData)}>
          {initialData ? "Update Leave Type" : "Create Leave Type"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
