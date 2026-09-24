import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowLeft, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Route = createFileRoute("/hr-dashboard/finance/loans")({
  component: LoansPage,
});

interface LoanItem {
  id: number;
  employee: { name: string; email: string };
  amount: number;
  status: "Pending" | "Approved" | "Rejected";
  reason: string;
  date: string;
}

const initialLoans: LoanItem[] = [
  { id: 1, employee: { name: "Himanshu Raut", email: "himanshu@gmail.com" }, amount: 25000, status: "Pending", reason: "Emergency medical hospital expense", date: "2026-08-01" },
  { id: 2, employee: { name: "Indrajeet", email: "indrajeet@gmail.com" }, amount: 15000, status: "Approved", reason: "Home laptop purchase advance", date: "2026-07-20" },
  { id: 3, employee: { name: "Kamal", email: "kamal@gmail.com" }, amount: 10000, status: "Pending", reason: "Relocation advance for rental deposit", date: "2026-08-04" },
];

function LoansPage() {
  const { toast } = useToast();
  const [loans, setLoans] = useState<LoanItem[]>(initialLoans);

  const handleUpdate = (id: number, status: "Approved" | "Rejected") => {
    setLoans(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    toast({
      title: `Loan Request ${status}`,
      description: `Request #${id} has been marked as ${status}.`,
    });
  };

  return (
    <div className="p-1 sm:p-2 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" /> Loan & Advance Requests
          </h1>
          <p className="text-sm text-muted-foreground">Review employee company loan requests, EMI tenure, and approval queue.</p>
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
                <TableHead>Requested Amount</TableHead>
                <TableHead>Application Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map(loan => (
                <TableRow key={loan.id}>
                  <TableCell>
                    <div className="font-semibold text-sm">{loan.employee.name}</div>
                    <div className="text-xs text-muted-foreground">{loan.employee.email}</div>
                  </TableCell>
                  <TableCell className="font-mono text-sm font-bold">₹{loan.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-xs font-mono">{loan.date}</TableCell>
                  <TableCell>
                    <Badge variant={loan.status === "Approved" ? "default" : loan.status === "Rejected" ? "destructive" : "secondary"}>
                      {loan.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs max-w-xs">{loan.reason}</TableCell>
                  <TableCell className="text-right">
                    {loan.status === "Pending" ? (
                      <div className="flex justify-end gap-1.5">
                        <Button
                          size="sm"
                          className="h-8 bg-emerald-600 hover:bg-emerald-700 text-xs"
                          onClick={() => handleUpdate(loan.id, "Approved")}
                        >
                          <Check className="h-3.5 w-3.5 mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-rose-600 border-rose-200 hover:bg-rose-50 text-xs"
                          onClick={() => handleUpdate(loan.id, "Rejected")}
                        >
                          <X className="h-3.5 w-3.5 mr-1" /> Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-muted-foreground uppercase">{loan.status}</span>
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
