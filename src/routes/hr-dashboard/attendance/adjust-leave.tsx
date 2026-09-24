import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, FileText, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/attendance/adjust-leave")({
  component: AdjustLeavePage,
});

interface AdjustmentRecord {
  id: string;
  employee: string;
  type: "Increase" | "Decrease";
  amount: number;
  previous: number;
  newBalance: number;
  reason: string;
  updatedBy: string;
  updatedAt: string;
}

const initialHistory: AdjustmentRecord[] = [
  {
    id: "ADJ-1",
    employee: "Himanshu Raut",
    type: "Increase",
    amount: 1.5,
    previous: 3.5,
    newBalance: 5.0,
    reason: "Comp-off for weekend deployment work",
    updatedBy: "HR Admin",
    updatedAt: "2026-08-01 11:20 AM",
  },
  {
    id: "ADJ-2",
    employee: "Akshay",
    type: "Decrease",
    amount: 1.0,
    previous: 4.0,
    newBalance: 3.0,
    reason: "Encashment adjustment",
    updatedBy: "HR Admin",
    updatedAt: "2026-07-28 04:15 PM",
  },
];

function AdjustLeavePage() {
  const { toast } = useToast();
  const [history, setHistory] = useState<AdjustmentRecord[]>(initialHistory);
  const [employee, setEmployee] = useState("Himanshu Raut");
  const [type, setType] = useState<"Increase" | "Decrease">("Increase");
  const [amount, setAmount] = useState<string>("1");
  const [reason, setReason] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount) || 0;
    if (numAmount <= 0) {
      toast({ title: "Invalid Amount", description: "Please enter a valid positive number.", variant: "destructive" });
      return;
    }

    const prevBalance = 4.0;
    const newBal = type === "Increase" ? prevBalance + numAmount : Math.max(0, prevBalance - numAmount);

    const newRec: AdjustmentRecord = {
      id: `ADJ-${Date.now().toString().slice(-4)}`,
      employee,
      type,
      amount: numAmount,
      previous: prevBalance,
      newBalance: newBal,
      reason: reason || "Manual adjustment by HR",
      updatedBy: "HR Admin",
      updatedAt: new Date().toLocaleString(),
    };

    setHistory([newRec, ...history]);
    setReason("");
    setAmount("1");
    toast({
      title: "Leave Adjusted",
      description: `Successfully recorded ${type.toLowerCase()} of ${numAmount} leave day(s) for ${employee}.`,
    });
  };

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Adjust Paid Leave</h1>
          <p className="text-sm text-muted-foreground">Adjust employee leave balances manually with audit logging.</p>
        </div>
        <Button variant="outline" asChild size="sm">
          <Link to="/hr-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
          </Link>
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="py-4">
          <CardTitle className="flex items-center text-base">
            <FileText className="mr-2 h-4 w-4 text-primary" /> Leave Adjustment Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Select Employee</label>
                <Select value={employee} onValueChange={setEmployee}>
                  <SelectTrigger className="h-9"><SelectValue placeholder="--Choose Employee--" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Himanshu Raut">Himanshu Raut</SelectItem>
                    <SelectItem value="Indrajeet">Indrajeet</SelectItem>
                    <SelectItem value="Kamal">Kamal</SelectItem>
                    <SelectItem value="Akshay">Akshay</SelectItem>
                    <SelectItem value="Lokendra">Lokendra</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Adjustment Type</label>
                <Select value={type} onValueChange={(v) => setType(v as "Increase" | "Decrease")}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Increase">Increase (Credit Leave)</SelectItem>
                    <SelectItem value="Decrease">Decrease (Debit Leave)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Amount (in days)</label>
                <Input
                  type="number"
                  step="0.5"
                  className="h-9"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 1.0"
                  required
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Reason / Justification</label>
                <Textarea
                  placeholder="Enter reason for this manual balance change..."
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" size="sm" className="w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" /> Save Adjustment
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="py-4">
          <CardTitle className="flex items-center text-base">
            <RefreshCcw className="mr-2 h-4 w-4 text-primary" /> Paid Leave Adjustment History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>EMPLOYEE</TableHead>
                <TableHead>TYPE</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>PREVIOUS</TableHead>
                <TableHead>NEW</TableHead>
                <TableHead>REASON</TableHead>
                <TableHead>UPDATED BY</TableHead>
                <TableHead>UPDATED AT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-semibold text-sm">{row.employee}</TableCell>
                  <TableCell>
                    <Badge variant={row.type === "Increase" ? "default" : "destructive"}>
                      {row.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm font-semibold">{row.amount} day(s)</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{row.previous}</TableCell>
                  <TableCell className="font-mono text-xs font-bold">{row.newBalance}</TableCell>
                  <TableCell className="text-xs max-w-xs truncate">{row.reason}</TableCell>
                  <TableCell className="text-xs">{row.updatedBy}</TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">{row.updatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
