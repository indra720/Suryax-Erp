import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowLeft, Receipt } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/finance/reimbursements")({
  component: ReimbursementsPage,
});

interface ReimbursementItem {
  id: number;
  employee: { name: string; email: string };
  amount: number;
  status: "Pending" | "Approved" | "Rejected";
  category: string;
  date: string;
  notes: string;
}

const initialReimbursements: ReimbursementItem[] = [
  { id: 1, employee: { name: "Himanshu Raut", email: "himanshu@gmail.com" }, amount: 3500, status: "Pending", category: "Client Travel", date: "2026-08-01", notes: "Cab and train fares for VR site demo" },
  { id: 2, employee: { name: "Indrajeet", email: "indrajeet@gmail.com" }, amount: 2200, status: "Approved", category: "Meals & Fuel", date: "2026-07-29", notes: "Team lunch during launch sprint" },
  { id: 3, employee: { name: "Akshay", email: "akshay@gmail.com" }, amount: 5400, status: "Pending", category: "Hardware & Tools", date: "2026-08-02", notes: "Testing cables, USB hub and monitors" },
];

function ReimbursementsPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<ReimbursementItem[]>(initialReimbursements);

  const handleUpdate = (id: number, status: "Approved" | "Rejected") => {
    setItems(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast({
      title: `Reimbursement ${status}`,
      description: `Claim #${id} has been marked as ${status}.`,
    });
  };

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Receipt className="h-6 w-6 text-primary" /> Expense Reimbursements
          </h1>
          <p className="text-sm text-muted-foreground">Audit employee expense receipts, claims, and reimbursement payouts.</p>
        </div>
        <Button variant="outline" asChild size="sm">
          <Link to="/hr-dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
          </Link>
        </Button>
      </div>

      <Card className="shadow-sm overflow-hidden">
        <CardContent className="p-0 overflow-x-auto w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Claim Amount</TableHead>
                <TableHead>Expense Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description / Receipt</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map(r => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div className="font-semibold text-sm">{r.employee.name}</div>
                    <div className="text-xs text-muted-foreground">{r.employee.email}</div>
                  </TableCell>
                  <TableCell className="font-mono text-sm font-bold">₹{r.amount.toLocaleString()}</TableCell>
                  <TableCell><Badge variant="secondary">{r.category}</Badge></TableCell>
                  <TableCell className="text-xs font-mono">{r.date}</TableCell>
                  <TableCell className="text-xs max-w-xs">{r.notes}</TableCell>
                  <TableCell>
                    <Badge variant={r.status === "Approved" ? "default" : r.status === "Rejected" ? "destructive" : "secondary"}>
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {r.status === "Pending" ? (
                      <div className="flex justify-end gap-1.5">
                        <Button
                          size="sm"
                          className="h-8 bg-emerald-600 hover:bg-emerald-700 text-xs"
                          onClick={() => handleUpdate(r.id, "Approved")}
                        >
                          <Check className="h-3.5 w-3.5 mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-rose-600 border-rose-200 hover:bg-rose-50 text-xs"
                          onClick={() => handleUpdate(r.id, "Rejected")}
                        >
                          <X className="h-3.5 w-3.5 mr-1" /> Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-muted-foreground uppercase">{r.status}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
