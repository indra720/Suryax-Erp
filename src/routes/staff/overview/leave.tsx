import React, { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, PlusCircle, CheckCircle, Clock, XCircle, Heart, Plane, Umbrella, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { fetchStaffLeaveHistory, requestStaffLeave } from "@/lib/services/staff";

export const Route = createFileRoute("/staff/overview/leave")({
  head: () => ({
    meta: [{ title: "My Leave Requests & Entitlements | Vrindavan ERP Staff" }],
  }),
  component: StaffLeavePage,
});

export function StaffLeavePage() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    leave_type: "Casual Leave",
    start_date: new Date().toISOString().slice(0, 10),
    end_date: new Date().toISOString().slice(0, 10),
    reason: "",
  });

  const loadLeaves = async () => {
    setLoading(true);
    try {
      const data = await fetchStaffLeaveHistory();
      setLeaves(data.leaves || [
        { id: 1, leave_type: "Casual Leave", start_date: "2026-09-17", end_date: "2026-09-17", days: 1, reason: "Family event", status: "Approved", applied_on: "15 Sep 2026" },
        { id: 2, leave_type: "Sick Leave", start_date: "2026-08-05", end_date: "2026-08-06", days: 2, reason: "Viral fever", status: "Approved", applied_on: "04 Aug 2026" },
      ]);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.reason.trim()) {
      toast.error("Please enter a reason.");
      return;
    }
    setSubmitting(true);
    try {
      await requestStaffLeave(form);
      toast.success("Leave application submitted successfully!");
      setShowApplyModal(false);
      setForm({
        leave_type: "Casual Leave",
        start_date: new Date().toISOString().slice(0, 10),
        end_date: new Date().toISOString().slice(0, 10),
        reason: "",
      });
      loadLeaves();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit leave application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Navigation Submenu Tabs */}
      {/* <div className="flex items-center gap-1 border-b pb-2 text-xs font-medium">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/overview">Overview</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/overview/attendance">Attendance</Link>
        </Button>
        <Button variant="secondary" size="sm" asChild className="font-semibold">
          <Link to="/staff/overview/leave">Leave Requests</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/overview/location">Location & Geofence</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/profile">My Profile</Link>
        </Button>
      </div> */}

      {/* Leave Balance Entitlement Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="border-l-4 border-l-blue-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Casual Leave (CL)</p>
                <h3 className="text-xl font-bold mt-1 text-foreground">5 / 12 Days</h3>
                <span className="text-[11px] text-muted-foreground">7 days available</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                <Umbrella className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-rose-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Sick Leave (SL)</p>
                <h3 className="text-xl font-bold mt-1 text-foreground">2 / 12 Days</h3>
                <span className="text-[11px] text-muted-foreground">10 days available</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-600">
                <Heart className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Earned Leave (EL)</p>
                <h3 className="text-xl font-bold mt-1 text-foreground">0 / 15 Days</h3>
                <span className="text-[11px] text-muted-foreground">15 days available</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Plane className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Application History */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Leave Application History
            </CardTitle>
            <CardDescription className="text-xs">
              Status of all your submitted leave requests and supervisor approvals.
            </CardDescription>
          </div>

          <Button size="sm" onClick={() => setShowApplyModal(true)} className="h-8 text-xs gap-1.5 font-semibold">
            <PlusCircle className="h-4 w-4" />
            Apply For Leave
          </Button>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-xs font-bold">Leave Type</TableHead>
                  <TableHead className="text-xs font-bold">Duration</TableHead>
                  <TableHead className="text-xs font-bold">Days</TableHead>
                  <TableHead className="text-xs font-bold">Reason</TableHead>
                  <TableHead className="text-xs font-bold">Applied On</TableHead>
                  <TableHead className="text-xs font-bold text-right">Approval Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaves.map((l) => (
                  <TableRow key={l.id} className="text-xs hover:bg-muted/30">
                    <TableCell className="font-semibold text-foreground">{l.leave_type}</TableCell>
                    <TableCell className="text-muted-foreground">{l.start_date} to {l.end_date}</TableCell>
                    <TableCell className="font-medium text-foreground">{l.days || 1} day</TableCell>
                    <TableCell className="text-foreground max-w-xs truncate">{l.reason}</TableCell>
                    <TableCell className="text-muted-foreground">{l.applied_on || "Recent"}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          l.status === "Approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : l.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border-amber-300"
                            : "bg-rose-50 text-rose-700 border-rose-300"
                        }`}
                      >
                        {l.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Apply Leave Modal */}
      <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <PlusCircle className="h-5 w-5 text-primary" />
              Apply For Leave
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleApply} className="space-y-3 text-xs">
            <div>
              <Label className="text-xs font-semibold">Select Leave Type</Label>
              <Select
                value={form.leave_type}
                onValueChange={(val) => setForm({ ...form, leave_type: val })}
              >
                <SelectTrigger className="h-8 text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Casual Leave" className="text-xs">Casual Leave (CL)</SelectItem>
                  <SelectItem value="Sick Leave" className="text-xs">Sick Leave (SL)</SelectItem>
                  <SelectItem value="Earned Leave" className="text-xs">Earned Leave (EL)</SelectItem>
                  <SelectItem value="Half Day" className="text-xs">Half Day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs font-semibold">From Date</Label>
                <Input
                  type="date"
                  className="h-8 text-xs mt-1"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">To Date</Label>
                <Input
                  type="date"
                  className="h-8 text-xs mt-1"
                  value={form.end_date}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold">Detailed Reason</Label>
              <Textarea
                placeholder="Explain the reason for taking leave..."
                className="text-xs mt-1 resize-none h-20"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                required
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowApplyModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={submitting}>
                {submitting && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
                Submit Leave
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
