import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wallet, Plus, Edit, Trash2, Download, ArrowLeft, ChevronLeft, ChevronRight, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/finance/salary")({
  component: SalaryPage,
});

const EMPLOYEES = ["Himanshu Raut", "Indrajeet", "Kamal", "Lokendra", "Purvansh", "Shailesh", "Akshay"];
const PAYMENT_MODES = ["Bank Transfer", "Cheque", "Cash", "UPI"];

function SalaryForm({ onSave }: { onSave?: () => void }) {
  const { toast } = useToast();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Employee *</label>
          <Select defaultValue="Himanshu Raut">
            <SelectTrigger className="h-9"><SelectValue placeholder="Select Employee" /></SelectTrigger>
            <SelectContent>
              {EMPLOYEES.map(emp => <SelectItem key={emp} value={emp}>{emp}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Effective From</label>
          <Input type="date" defaultValue="2026-08-01" className="h-9" />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Payment Mode</label>
          <Select defaultValue="Bank Transfer">
            <SelectTrigger className="h-9"><SelectValue placeholder="Payment Mode" /></SelectTrigger>
            <SelectContent>
              {PAYMENT_MODES.map(mode => <SelectItem key={mode} value={mode}>{mode}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="text-xs font-bold text-primary uppercase pt-2">Earnings (Monthly)</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div><Input type="number" placeholder="Basic Salary (₹)" defaultValue={60000} className="h-9" /></div>
        <div><Input type="number" placeholder="HRA (₹)" defaultValue={25000} className="h-9" /></div>
        <div><Input type="number" placeholder="DA (₹)" defaultValue={10000} className="h-9" /></div>
        <div><Input type="number" placeholder="Conveyance (₹)" defaultValue={5000} className="h-9" /></div>
        <div><Input type="number" placeholder="Medical (₹)" defaultValue={3000} className="h-9" /></div>
        <div><Input type="number" placeholder="Special (₹)" defaultValue={10000} className="h-9" /></div>
        <div><Input type="number" placeholder="Bonus (₹)" defaultValue={3500} className="h-9" /></div>
        <div><Input type="number" placeholder="OT Rate/Hr (₹)" defaultValue={350} className="h-9" /></div>
      </div>

      <div className="text-xs font-bold text-primary uppercase pt-2">Fixed Monthly Deductions</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div><Input type="number" placeholder="PF (₹)" defaultValue={1800} className="h-9" /></div>
        <div><Input type="number" placeholder="ESI (₹)" defaultValue={0} className="h-9" /></div>
        <div><Input type="number" placeholder="Prof. Tax (₹)" defaultValue={200} className="h-9" /></div>
        <div><Input type="number" placeholder="TDS (₹)" defaultValue={2500} className="h-9" /></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox id="current" defaultChecked />
          <label htmlFor="current" className="text-xs font-medium cursor-pointer">Mark as Current Salary Structure</label>
        </div>
        <div className="sm:col-span-2">
          <Textarea placeholder="Remarks / Annual increment notes..." rows={2} />
        </div>
      </div>
      
      <Button
        className="w-full sm:w-auto"
        size="sm"
        onClick={() => {
          toast({ title: "Salary Entry Saved", description: "Employee compensation structure successfully saved." });
          onSave?.();
        }}
      >
        <Plus className="h-4 w-4 mr-2" /> Save Salary Entry
      </Button>
    </div>
  );
}

function SalaryPage() {
  const [selectedMonth, setSelectedMonth] = useState("August 2026");
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" /> Employee Salary Register
          </h1>
          <p className="text-sm text-muted-foreground">Manage base earnings, fixed deductions, and monthly payroll revisions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild size="sm">
            <Link to="/hr-dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export Payroll
          </Button>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="bg-muted/40 rounded-xl p-4 sm:p-5 mb-6 border">
            <h3 className="text-base font-bold mb-1">Add / Revise Salary Entry</h3>
            <p className="text-xs text-muted-foreground mb-4">A revision appends a dated structure in history — previous payslips remain immutable.</p>
            <SalaryForm />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h3 className="text-lg font-bold">{selectedMonth}</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[170px] h-9"><SelectValue placeholder="All Employees" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  {EMPLOYEES.map(emp => <SelectItem key={emp} value={emp}>{emp}</SelectItem>)}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="h-9 w-9"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="sm" className="h-9">Today</Button>
              <Button variant="outline" size="icon" className="h-9 w-9"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Active configured card */}
            <div className="bg-card rounded-xl p-4 sm:p-5 border shadow-sm flex flex-col lg:flex-row justify-between gap-6">
              <div>
                <div className="font-bold text-base">Himanshu Raut</div>
                <div className="text-xs text-muted-foreground mt-0.5">Effective from: 21 Jul 2026</div>
                <Badge variant="secondary" className="mt-2 text-xs">Bank Transfer</Badge>
              </div>
              
              <div className="flex gap-6 items-center">
                <div className="text-center">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Gross Monthly</div>
                  <div className="font-bold text-lg">₹1,16,500.00</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Net Payable</div>
                  <div className="font-bold text-lg text-emerald-600">₹1,12,000.00</div>
                </div>
              </div>

              <div className="bg-muted/40 p-3 rounded-lg grid grid-cols-3 gap-2 text-center text-xs border">
                <div className="col-span-3 text-left font-semibold text-foreground border-b pb-1">Attendance Audit — August 2026</div>
                <div><div className="text-muted-foreground text-[10px]">Working Days</div><div className="font-bold">23</div></div>
                <div><div className="text-muted-foreground text-[10px]">Present</div><div className="font-bold text-emerald-600">22</div></div>
                <div><div className="text-muted-foreground text-[10px]">LWP</div><div className="font-bold text-rose-600">1</div></div>
                <div className="col-span-3 flex justify-between pt-1 border-t text-[11px]">
                  <span>LWP Cut: <b className="text-rose-600">₹5,065.20</b></span>
                  <span>Final Disbursed: <b className="text-emerald-600">₹1,06,934.80</b></span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto w-full sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Edit Salary Configuration</DialogTitle>
                    </DialogHeader>
                    <SalaryForm onSave={() => setIsEditOpen(false)} />
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-rose-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Other employees status cards */}
            {["Indrajeet", "Kamal", "Lokendra", "Purvansh", "Shailesh"].map((name) => (
              <div key={name} className="bg-card rounded-lg p-4 border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="font-semibold text-sm">{name}</div>
                <div className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 px-3 py-1 rounded-full">
                  Standard entry assigned (₹45,000/mo) • Verified
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs">Configure Custom</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
