import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  IdCard,
  QrCode,
  Download,
  Printer,
  Building2,
  Mail,
  Phone,
  User,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/hr-dashboard/employees/id-studio")({
  head: () => ({
    meta: [{ title: "Employee ID Card Studio | HR Dashboard" }],
  }),
  component: HrIdStudioPage,
});

export function HrIdStudioPage() {
  const [selectedEmp, setSelectedEmp] = useState("1");
  const [empCode, setEmpCode] = useState("EMP-101");
  const [bloodGroup, setBloodGroup] = useState("O+");

  const employees = [
    { id: "1", name: "Rahul Sharma", code: "EMP-101", role: "Software Engineer", dept: "Engineering", email: "rahul@vrindavan.com", phone: "+91 98290 11223" },
    { id: "2", name: "Pooja Sharma", code: "EMP-102", role: "Telecalling Lead", dept: "Sales", email: "pooja@vrindavan.com", phone: "+91 98290 88776" },
    { id: "3", name: "Amit Kumar", code: "EMP-103", role: "Senior Sales Exec", dept: "Sales", email: "amit@vrindavan.com", phone: "+91 98290 77889" },
  ];

  const currentEmp = employees.find((e) => e.id === selectedEmp) || employees[0];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <IdCard className="size-6 text-primary" />
            Employee ID Card Studio
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Generate and export standardized NFC/QR-enabled company identity cards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success("Preparing PDF print format...")}
            className="h-8 text-xs gap-1.5"
          >
            <Printer className="h-3.5 w-3.5" />
            Print Badge
          </Button>
          <Button
            size="sm"
            onClick={() => toast.success("Digital ID downloaded as PNG.")}
            className="h-8 text-xs gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            Download Digital Card
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        {/* Controls Card */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold">Badge Parameters</CardTitle>
            <CardDescription className="text-xs">Select employee and customize badge data</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-3 text-xs">
            <div>
              <Label className="text-xs font-semibold">Select Employee</Label>
              <Select value={selectedEmp} onValueChange={setSelectedEmp}>
                <SelectTrigger className="h-8 text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((e) => (
                    <SelectItem key={e.id} value={e.id} className="text-xs">
                      {e.name} ({e.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-semibold">Badge ID Number</Label>
              <Input
                className="h-8 text-xs mt-1 font-mono"
                value={empCode}
                onChange={(e) => setEmpCode(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Blood Group</Label>
              <Select value={bloodGroup} onValueChange={setBloodGroup}>
                <SelectTrigger className="h-8 text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                    <SelectItem key={bg} value={bg} className="text-xs">
                      {bg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-2 text-muted-foreground text-[11px]">
              Every badge includes cryptographic QR for biometric verification at security turnstiles.
            </div>
          </CardContent>
        </Card>

        {/* Live ID Card Preview */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center p-6 bg-muted/20 rounded-xl border border-dashed">
          <div className="w-[300px] sm:w-[340px] rounded-2xl bg-card border-2 border-primary/20 shadow-xl overflow-hidden flex flex-col">
            {/* Header branding */}
            <div className="bg-gradient-to-r from-primary via-indigo-600 to-primary p-4 text-white text-center relative">
              <h3 className="font-extrabold text-sm tracking-widest uppercase">VRINDAVAN ESTATES</h3>
              <p className="text-[9px] text-white/80 tracking-wider">OFFICIAL EMPLOYEE CREDENTIAL</p>
              <div className="absolute right-3 top-3">
                <ShieldCheck className="size-4 text-white/80" />
              </div>
            </div>

            {/* Photo & Name */}
            <div className="p-5 flex flex-col items-center text-center">
              <div className="size-20 rounded-full bg-primary/10 border-2 border-primary text-primary font-bold text-xl flex items-center justify-center shadow-inner mb-3">
                {currentEmp.name.slice(0, 2).toUpperCase()}
              </div>

              <h2 className="text-lg font-bold text-foreground">{currentEmp.name}</h2>
              <Badge variant="outline" className="mt-1 text-[10px] bg-primary/5 text-primary border-primary/20">
                {currentEmp.role}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">{currentEmp.dept} Department</p>

              {/* Data Grid */}
              <div className="w-full mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-[11px] text-left">
                <div>
                  <span className="text-muted-foreground block text-[10px]">EMPLOYEE ID</span>
                  <span className="font-mono font-bold text-foreground">{empCode}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">BLOOD GROUP</span>
                  <span className="font-bold text-foreground">{bloodGroup}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">VALID UNTIL</span>
                  <span className="font-semibold text-foreground">DEC 2027</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">STATUS</span>
                  <span className="font-semibold text-emerald-600">AUTHORIZED</span>
                </div>
              </div>

              {/* QR Barcode */}
              <div className="mt-4 pt-3 border-t w-full flex items-center justify-between text-muted-foreground">
                <div className="flex items-center gap-1.5 text-[10px]">
                  <QrCode className="size-8 text-foreground" />
                  <span className="font-mono text-[9px]">SCAN FOR BIO VERIFICATION</span>
                </div>
                <div className="text-[9px] text-right font-medium">
                  BRANCH: MAIN HQ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
