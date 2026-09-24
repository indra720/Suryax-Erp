import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Download, ArrowLeft, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/finance/payslips")({
  component: PayslipsPage,
});

const EMPLOYEES = ["Akshay", "Himanshu Raut", "Indrajeet", "Kamal", "Lokendra", "Purvansh", "Shailesh"];

interface SlipItem {
  id: string;
  employee: string;
  month: string;
  basic: number;
  deductions: number;
  net: number;
  generatedDate: string;
}

const initialSlips: SlipItem[] = [
  { id: "PAY-2026-07-01", employee: "Himanshu Raut", month: "July 2026", basic: 60000, deductions: 4500, net: 112000, generatedDate: "2026-07-31" },
  { id: "PAY-2026-07-02", employee: "Indrajeet", month: "July 2026", basic: 45000, deductions: 2500, net: 48000, generatedDate: "2026-07-31" },
  { id: "PAY-2026-07-03", employee: "Kamal", month: "July 2026", basic: 40000, deductions: 2000, net: 42000, generatedDate: "2026-07-31" },
];

function PayslipsPage() {
  const { toast } = useToast();
  const [slips, setSlips] = useState<SlipItem[]>(initialSlips);
  const [employee, setEmployee] = useState(EMPLOYEES[1]);
  const [month, setMonth] = useState("2026-08");
  const [basic, setBasic] = useState("60000");
  const [deductions, setDeductions] = useState("4500");
  const [net, setNet] = useState("112000");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlip: SlipItem = {
      id: `PAY-${month}-${Date.now().toString().slice(-4)}`,
      employee,
      month,
      basic: Number(basic) || 0,
      deductions: Number(deductions) || 0,
      net: Number(net) || 0,
      generatedDate: new Date().toISOString().split("T")[0],
    };

    setSlips([newSlip, ...slips]);
    toast({
      title: "Salary Slip Generated",
      description: `Slip for ${employee} (${month}) has been compiled and is ready for download.`,
    });
  };

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" /> Salary Slip Management
          </h1>
          <p className="text-sm text-muted-foreground">Generate, verify, and export monthly employee salary slips.</p>
        </div>
        <Button variant="outline" asChild size="sm">
          <Link to="/hr-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
          </Link>
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-4 sm:p-6">
          {/* Form Section */}
          <div className="bg-muted/40 rounded-xl p-4 sm:p-5 mb-8 border">
            <h3 className="text-base font-bold mb-3">Generate Monthly Payslip</h3>
            <form onSubmit={handleGenerate}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Employee *</label>
                  <Select value={employee} onValueChange={setEmployee}>
                    <SelectTrigger className="h-9"><SelectValue placeholder="Select Employee" /></SelectTrigger>
                    <SelectContent>
                      {EMPLOYEES.map(emp => <SelectItem key={emp} value={emp}>{emp}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Pay Period (Month) *</label>
                  <Input type="month" className="h-9" value={month} onChange={(e) => setMonth(e.target.value)} required />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Basic Salary (₹)</label>
                  <Input type="number" className="h-9" value={basic} onChange={(e) => setBasic(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Deductions (₹)</label>
                  <Input type="number" className="h-9" value={deductions} onChange={(e) => setDeductions(e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Net Salary (₹)</label>
                  <Input type="number" className="h-9" value={net} onChange={(e) => setNet(e.target.value)} />
                </div>
              </div>
              <Button type="submit" size="sm" className="mt-4">
                <Plus className="h-4 w-4 mr-2" /> Generate Salary Slip
              </Button>
            </form>
          </div>

          {/* List Section */}
          <div>
            <h3 className="text-base font-bold mb-3">Generated Salary Slips</h3>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Slip ID</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Basic</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Pay</TableHead>
                    <TableHead>Generated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {slips.map((slip) => (
                    <TableRow key={slip.id}>
                      <TableCell className="font-mono text-xs font-bold text-primary">{slip.id}</TableCell>
                      <TableCell className="font-semibold text-sm">{slip.employee}</TableCell>
                      <TableCell className="text-xs">{slip.month}</TableCell>
                      <TableCell className="font-mono text-xs">₹{slip.basic.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-xs text-rose-600">₹{slip.deductions.toLocaleString()}</TableCell>
                      <TableCell className="font-mono text-sm font-bold text-emerald-600">₹{slip.net.toLocaleString()}</TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{slip.generatedDate}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1.5 text-xs"
                          onClick={() => toast({ title: "Downloading Payslip", description: `Downloading PDF for ${slip.employee}.` })}
                        >
                          <Download className="h-3.5 w-3.5" /> PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
