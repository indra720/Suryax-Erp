import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Boxes,
  Laptop,
  Smartphone,
  CreditCard,
  Plus,
  Shield,
  Search,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/hr-dashboard/employees/manage-assets")({
  head: () => ({
    meta: [{ title: "Company Asset Management | HR Dashboard" }],
  }),
  component: HrManageAssetsPage,
});

export function HrManageAssetsPage() {
  const [assets, setAssets] = useState([
    { id: 1, tag: "AST-LTP-01", type: "Laptop", model: "Dell Latitude 5420 (i5/16GB)", assignedTo: "Rahul Sharma", dept: "Engineering", issueDate: "15 Jan 2024", status: "Allocated" },
    { id: 2, tag: "AST-PHN-04", type: "Smartphone", model: "Samsung Galaxy A23 + CUG SIM", assignedTo: "Pooja Sharma", dept: "Sales", issueDate: "01 Mar 2024", status: "Allocated" },
    { id: 3, tag: "AST-LTP-08", type: "Laptop", model: "Lenovo ThinkPad E14", assignedTo: "Priya Patel", dept: "Design", issueDate: "05 Jun 2024", status: "Allocated" },
    { id: 4, tag: "AST-CRD-12", type: "Access Card", model: "RFID Keycard v2", assignedTo: "Vijay Singh", dept: "Finance", issueDate: "20 Aug 2024", status: "Allocated" },
    { id: 5, tag: "AST-LTP-15", type: "Laptop", model: "HP ProBook 440 G8", assignedTo: "-", dept: "-", issueDate: "-", status: "In Stock" },
  ]);

  const [form, setForm] = useState({
    type: "Laptop",
    model: "",
    tag: "",
    assignedTo: "Rahul Sharma",
  });

  const handleIssueAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.model || !form.tag) {
      toast.error("Please fill asset model and asset tag.");
      return;
    }
    const newAsset = {
      id: assets.length + 1,
      tag: form.tag,
      type: form.type,
      model: form.model,
      assignedTo: form.assignedTo,
      dept: "Operations",
      issueDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Allocated",
    };
    setAssets([newAsset, ...assets]);
    toast.success("Asset issued and recorded in inventory.");
    setForm({ type: "Laptop", model: "", tag: "", assignedTo: "Rahul Sharma" });
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Boxes className="size-6 text-primary" />
          Company Asset Management
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Track employee device allocation: laptops, telecaller phones, SIMs, and building access cards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-4 items-start">
        {/* Left Form: Assign New Asset */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold">Issue New Asset</CardTitle>
            <CardDescription className="text-xs">Record allocation to staff inventory</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <form onSubmit={handleIssueAsset} className="space-y-3 text-xs">
              <div>
                <Label className="text-xs font-semibold">Asset Category</Label>
                <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val })}>
                  <SelectTrigger className="h-8 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laptop" className="text-xs">Work Laptop</SelectItem>
                    <SelectItem value="Smartphone" className="text-xs">Sales Mobile / CUG Phone</SelectItem>
                    <SelectItem value="Access Card" className="text-xs">Office RFID Access Card</SelectItem>
                    <SelectItem value="SIM Card" className="text-xs">Telecalling SIM Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-semibold">Asset Tag / Serial No</Label>
                <Input
                  className="h-8 text-xs mt-1 font-mono"
                  placeholder="e.g. AST-LTP-20"
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Model / Hardware Spec</Label>
                <Input
                  className="h-8 text-xs mt-1"
                  placeholder="e.g. Dell Latitude 5430"
                  value={form.model}
                  onChange={(e) => setForm({ ...form, model: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Assign To Employee</Label>
                <Select value={form.assignedTo} onValueChange={(val) => setForm({ ...form, assignedTo: val })}>
                  <SelectTrigger className="h-8 text-xs mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rahul Sharma" className="text-xs">Rahul Sharma (EMP-101)</SelectItem>
                    <SelectItem value="Pooja Sharma" className="text-xs">Pooja Sharma (EMP-102)</SelectItem>
                    <SelectItem value="Amit Kumar" className="text-xs">Amit Kumar (EMP-103)</SelectItem>
                    <SelectItem value="Priya Patel" className="text-xs">Priya Patel (EMP-104)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" size="sm" className="w-full h-8 text-xs font-semibold mt-2">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Assign Asset
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Table: Active Asset Allocations */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold">Asset Inventory Register</CardTitle>
            <CardDescription className="text-xs">All hardware items and current custodians</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="text-xs font-bold">Asset Tag</TableHead>
                    <TableHead className="text-xs font-bold">Category</TableHead>
                    <TableHead className="text-xs font-bold">Model / Details</TableHead>
                    <TableHead className="text-xs font-bold">Assigned To</TableHead>
                    <TableHead className="text-xs font-bold">Issued Date</TableHead>
                    <TableHead className="text-xs font-bold text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((ast) => (
                    <TableRow key={ast.id} className="text-xs hover:bg-muted/30">
                      <TableCell className="font-mono font-bold text-primary">{ast.tag}</TableCell>
                      <TableCell className="font-medium text-foreground">{ast.type}</TableCell>
                      <TableCell className="text-muted-foreground">{ast.model}</TableCell>
                      <TableCell className="font-semibold text-foreground">{ast.assignedTo}</TableCell>
                      <TableCell className="text-muted-foreground">{ast.issueDate}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${
                            ast.status === "Allocated"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : "bg-blue-50 text-blue-700 border-blue-300"
                          }`}
                        >
                          {ast.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
