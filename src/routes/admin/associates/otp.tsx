import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  Search,
  RefreshCw,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  User,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/associates/otp")({
  head: () => ({
    meta: [{ title: "Associate OTP Log & Verification | Vrindavan ERP" }],
  }),
  component: AssociateOtpPage,
});

interface OtpLog {
  id: string;
  associateId: string;
  associateName: string;
  mobile: string;
  otp: string;
  purpose: "Associate Registration" | "Booking Authorization" | "Commission Payout" | "Password Reset";
  sentTime: string;
  status: "Verified" | "Pending" | "Expired";
}

function AssociateOtpPage() {
  const [search, setSearch] = useState("");
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [genForm, setGenForm] = useState({
    associateId: "",
    mobile: "",
    purpose: "Booking Authorization",
  });

  const [logs, setLogs] = useState<OtpLog[]>([
    {
      id: "OTP-9021",
      associateId: "SX 10272",
      associateName: "Sunita Sharma",
      mobile: "+91 97828 02027",
      otp: "849201",
      purpose: "Booking Authorization",
      sentTime: "25 Sep 2026, 02:15 PM",
      status: "Verified",
    },
    {
      id: "OTP-9022",
      associateId: "SX 10188",
      associateName: "Rajendra Meena",
      mobile: "+91 98290 11442",
      otp: "310492",
      purpose: "Commission Payout",
      sentTime: "25 Sep 2026, 01:40 PM",
      status: "Verified",
    },
    {
      id: "OTP-9023",
      associateId: "SX 10304",
      associateName: "Kavita Soni",
      mobile: "+91 94140 88291",
      otp: "627194",
      purpose: "Associate Registration",
      sentTime: "25 Sep 2026, 11:20 AM",
      status: "Pending",
    },
    {
      id: "OTP-9024",
      associateId: "SX 10091",
      associateName: "Deepak Verma",
      mobile: "+91 98295 66778",
      otp: "193847",
      purpose: "Password Reset",
      sentTime: "24 Sep 2026, 05:10 PM",
      status: "Expired",
    },
  ]);

  const filtered = logs.filter(
    (l) =>
      l.associateName.toLowerCase().includes(search.toLowerCase()) ||
      l.associateId.toLowerCase().includes(search.toLowerCase()) ||
      l.mobile.includes(search) ||
      l.otp.includes(search)
  );

  const handleResend = (log: OtpLog) => {
    toast.success(`New OTP resent to ${log.mobile} for ${log.associateName}`);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!genForm.mobile) {
      toast.error("Please enter mobile number.");
      return;
    }
    const newOtp: OtpLog = {
      id: `OTP-${Math.floor(1000 + Math.random() * 9000)}`,
      associateId: genForm.associateId || `SX ${Math.floor(10000 + Math.random() * 900)}`,
      associateName: "New Associate",
      mobile: genForm.mobile,
      otp: Math.floor(100000 + Math.random() * 900000).toString(),
      purpose: genForm.purpose as any,
      sentTime: "Just now",
      status: "Pending",
    };
    setLogs([newOtp, ...logs]);
    toast.success(`OTP generated and sent to ${genForm.mobile}`);
    setShowGenerateModal(false);
    setGenForm({ associateId: "", mobile: "", purpose: "Booking Authorization" });
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ShieldCheck className="size-6 text-primary" />
            Associate OTP Verification & Logs
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Monitor real-time SMS OTP generation, booking authorizations, and registration verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowGenerateModal(true)}
            size="sm"
            className="h-8 text-xs gap-1.5 font-semibold bg-primary text-primary-foreground"
          >
            <Send className="h-3.5 w-3.5" />
            Send New OTP
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search by associate name, ID, mobile, OTP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            Total Logs: {filtered.length}
          </span>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-xs font-bold">Log ID</TableHead>
                  <TableHead className="text-xs font-bold">Associate</TableHead>
                  <TableHead className="text-xs font-bold">Mobile</TableHead>
                  <TableHead className="text-xs font-bold">OTP Code</TableHead>
                  <TableHead className="text-xs font-bold">Purpose</TableHead>
                  <TableHead className="text-xs font-bold">Generated At</TableHead>
                  <TableHead className="text-xs font-bold">Status</TableHead>
                  <TableHead className="text-xs font-bold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((l) => (
                  <TableRow key={l.id} className="text-xs hover:bg-muted/30">
                    <TableCell className="font-mono font-semibold text-primary">{l.id}</TableCell>
                    <TableCell>
                      <div className="font-bold text-foreground">{l.associateName}</div>
                      <div className="text-[11px] text-muted-foreground">{l.associateId}</div>
                    </TableCell>
                    <TableCell className="font-mono text-foreground">{l.mobile}</TableCell>
                    <TableCell className="font-mono font-bold tracking-wider text-primary">
                      {l.otp}
                    </TableCell>
                    <TableCell className="text-foreground">{l.purpose}</TableCell>
                    <TableCell className="text-muted-foreground">{l.sentTime}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-semibold ${
                          l.status === "Verified"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : l.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border-amber-300"
                            : "bg-rose-50 text-rose-700 border-rose-300"
                        }`}
                      >
                        {l.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResend(l)}
                        className="h-7 text-xs text-primary"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" /> Resend
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showGenerateModal} onOpenChange={setShowGenerateModal}>
        <DialogContent className="w-[92vw] sm:max-w-md p-5">
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Send className="h-4 w-4 text-primary" />
              Generate Associate OTP
            </DialogTitle>
            <DialogDescription className="text-xs">
              Send a secure one-time verification code directly to the associate mobile.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleGenerate} className="space-y-3 pt-2 text-xs">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Associate ID (Optional)</Label>
              <Input
                placeholder="e.g. SX 10272"
                value={genForm.associateId}
                onChange={(e) => setGenForm({ ...genForm, associateId: e.target.value })}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Associate Mobile Number *</Label>
              <Input
                placeholder="+91 98290 12345"
                value={genForm.mobile}
                onChange={(e) => setGenForm({ ...genForm, mobile: e.target.value })}
                className="h-8 text-xs"
                required
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Purpose</Label>
              <Input
                value={genForm.purpose}
                onChange={(e) => setGenForm({ ...genForm, purpose: e.target.value })}
                className="h-8 text-xs"
              />
            </div>

            <DialogFooter className="pt-3 border-t">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowGenerateModal(false)} className="h-8 text-xs">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="h-8 text-xs font-semibold bg-primary text-primary-foreground">
                Dispatch OTP
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
