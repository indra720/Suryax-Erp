import React, { useEffect, useState } from "react";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  TrendingUp,
  Target,
  UserCheck,
  Building,
  MapPin,
  CalendarCheck,
  CheckCircle2,
  Coffee,
  Briefcase,
  PlusCircle,
  Loader2,
  FileText,
  ScanFace,
} from "lucide-react";
import { FaceAttendanceDialog } from "@/components/attendance/FaceAttendanceDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { fetchStaffAttendanceTracker, requestStaffLeave, fetchStaffProfile } from "@/lib/services/staff";

export const Route = createFileRoute("/staff/overview")({
  head: () => ({
    meta: [{ title: "Staff HR Hub & Attendance Overview | Vrindavan ERP" }],
  }),
  component: StaffOverviewPage,
});

function StaffOverviewPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isRootOverview = pathname === "/staff/overview" || pathname === "/staff/overview/";
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [faceModalOpen, setFaceModalOpen] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    leave_type: "Casual Leave",
    start_date: new Date().toISOString().slice(0, 10),
    end_date: new Date().toISOString().slice(0, 10),
    reason: "",
  });
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchStaffProfile().then((data) => setProfile(data)).catch(() => {});
  }, []);

  const handlePunchToggle = () => {
    if (!isCheckedIn) {
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setIsCheckedIn(true);
      setCheckInTime(now);
      toast.success(`Punched in successfully at ${now}! Attendance recorded.`);
    } else {
      setIsCheckedIn(false);
      toast.info(`Punched out. Work hours logged for today.`);
    }
  };

  const handleLeaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveForm.reason.trim()) {
      toast.error("Please enter a reason for the leave request.");
      return;
    }
    setLeaveLoading(true);
    try {
      await requestStaffLeave(leaveForm);
      toast.success("Leave request submitted for Manager approval.");
      setShowLeaveModal(false);
      setLeaveForm({
        leave_type: "Casual Leave",
        start_date: new Date().toISOString().slice(0, 10),
        end_date: new Date().toISOString().slice(0, 10),
        reason: "",
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to submit leave request.");
    } finally {
      setLeaveLoading(false);
    }
  };

  const upcomingHolidays = [
    { name: "Gandhi Jayanti", date: "02 Oct 2026", day: "Friday" },
    { name: "Dussehra", date: "20 Oct 2026", day: "Tuesday" },
    { name: "Diwali Deepawali", date: "08 Nov 2026", day: "Sunday" },
    { name: "Govardhan Puja", date: "09 Nov 2026", day: "Monday" },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Navigation Submenu Tabs */}
      <div className="flex items-center gap-1 border-b pb-2 text-xs font-medium overflow-x-auto">
        <Button
          variant={isRootOverview ? "secondary" : "ghost"}
          size="sm"
          asChild
          className={isRootOverview ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}
        >
          <Link to="/staff/overview">Overview</Link>
        </Button>
        <Button
          variant={pathname.startsWith("/staff/overview/attendance") ? "secondary" : "ghost"}
          size="sm"
          asChild
          className={pathname.startsWith("/staff/overview/attendance") ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}
        >
          <Link to="/staff/overview/attendance">Attendance</Link>
        </Button>
        <Button
          variant={pathname.startsWith("/staff/overview/face-attendance") ? "secondary" : "ghost"}
          size="sm"
          asChild
          className={pathname.startsWith("/staff/overview/face-attendance") ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}
        >
          <Link to="/staff/overview/face-attendance">
            <ScanFace className="mr-1.5 h-3.5 w-3.5 text-primary" /> Face Attendance
          </Link>
        </Button>
        <Button
          variant={pathname.startsWith("/staff/overview/leave") ? "secondary" : "ghost"}
          size="sm"
          asChild
          className={pathname.startsWith("/staff/overview/leave") ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}
        >
          <Link to="/staff/overview/leave">Leave Requests</Link>
        </Button>
        <Button
          variant={pathname.startsWith("/staff/overview/location") ? "secondary" : "ghost"}
          size="sm"
          asChild
          className={pathname.startsWith("/staff/overview/location") ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}
        >
          <Link to="/staff/overview/location">Location & Geofence</Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-muted-foreground hover:text-foreground"
        >
          <Link to="/staff/profile">My Profile</Link>
        </Button>
      </div>

      <Outlet />

      {isRootOverview && (
        <>
          {/* Welcome & Punch In Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary uppercase tracking-wider">
                  Employee Portal
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
                Welcome back, {profile?.first_name || "Pooja"}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Department: {profile?.department || "Telecalling & Sales"} | Shift: 09:30 AM - 06:30 PM
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button
                size="sm"
                onClick={() => setFaceModalOpen(true)}
                className="text-xs font-bold gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
              >
                <ScanFace className="h-4 w-4" />
                {isCheckedIn ? "Face Punch Out" : "Punch with Face Scanner"}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={handlePunchToggle}
                className={`text-xs font-semibold gap-1.5 ${
                  isCheckedIn
                    ? "text-rose-600 border-rose-200 hover:bg-rose-50"
                    : "text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                }`}
              >
                <Clock className="h-4 w-4" />
                {isCheckedIn ? "Quick Out" : "Quick In"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLeaveModal(true)}
                className="text-xs font-semibold gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Apply Leave
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4 Attendance & Activity Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-l-4 border-l-blue-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs text-muted-foreground font-medium">Present Days</p>
            <h3 className="text-xl font-bold mt-1 text-foreground">22 / 24 Days</h3>
            <span className="text-[11px] text-emerald-600 font-medium">91.6% Attendance</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs text-muted-foreground font-medium">Avg Working Hours</p>
            <h3 className="text-xl font-bold mt-1 text-foreground">8.4 hrs/day</h3>
            <span className="text-[11px] text-muted-foreground">Standard 8 hrs met</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs text-muted-foreground font-medium">On-Time Punch Rate</p>
            <h3 className="text-xl font-bold mt-1 text-purple-700">96.0%</h3>
            <span className="text-[11px] text-emerald-600 font-medium">Punctual Badge</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 bg-card shadow-xs">
          <CardContent className="p-3 sm:p-4">
            <p className="text-xs text-muted-foreground font-medium">Leave Balance</p>
            <h3 className="text-xl font-bold mt-1 text-foreground">5 Days Left</h3>
            <span className="text-[11px] text-muted-foreground">3 Casual, 2 Sick</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Reporting Manager & Team Info */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <UserCheck className="h-4 w-4 text-primary" />
              Reporting Manager
            </CardTitle>
            <CardDescription className="text-xs">Your assigned Team Leader</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 text-xs space-y-2.5">
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/40 border">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                VS
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">{profile?.team_leader || "Vikram Singh"}</p>
                <p className="text-muted-foreground text-[11px]">Senior Team Leader - Residential</p>
                <p className="text-primary text-[11px] font-medium">+91 98290 55443</p>
              </div>
            </div>
            <div className="text-[11px] text-muted-foreground">
              For escalation, leave sign-offs, or lead reassignment requests, contact your Team Leader directly.
            </div>
          </CardContent>
        </Card>

        {/* Work Schedule */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <CalendarCheck className="h-4 w-4 text-primary" />
              Weekly Work Schedule
            </CardTitle>
            <CardDescription className="text-xs">Shift timetable & rest days</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 text-xs space-y-2">
            <div className="flex items-center justify-between py-1 border-b">
              <span className="font-medium text-foreground">Monday - Saturday</span>
              <span className="text-muted-foreground">09:30 AM - 06:30 PM</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b">
              <span className="font-medium text-foreground">Lunch Break</span>
              <span className="text-muted-foreground">01:30 PM - 02:15 PM</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b">
              <span className="font-medium text-foreground">Weekly Off</span>
              <Badge variant="outline" className="text-[10px] text-rose-600 border-rose-200">
                Sunday
              </Badge>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-medium text-foreground">Calling Target</span>
              <span className="text-emerald-600 font-semibold">15 Calls / Day</span>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Holidays */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
              <Coffee className="h-4 w-4 text-primary" />
              Upcoming Holidays
            </CardTitle>
            <CardDescription className="text-xs">Official Vrindavan ERP holiday calendar</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 text-xs space-y-2">
            {upcomingHolidays.map((h, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b last:border-none">
                <div>
                  <p className="font-semibold text-foreground">{h.name}</p>
                  <p className="text-[10px] text-muted-foreground">{h.day}</p>
                </div>
                <Badge variant="outline" className="text-[10px] bg-muted/60">
                  {h.date}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Apply Leave Dialog */}
      <Dialog open={showLeaveModal} onOpenChange={setShowLeaveModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Submit Leave Request
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLeaveSubmit} className="space-y-3 text-xs">
            <div>
              <Label className="text-xs font-semibold">Leave Type</Label>
              <Select
                value={leaveForm.leave_type}
                onValueChange={(val) => setLeaveForm({ ...leaveForm, leave_type: val })}
              >
                <SelectTrigger className="h-8 text-xs mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Casual Leave" className="text-xs">Casual Leave (CL)</SelectItem>
                  <SelectItem value="Sick Leave" className="text-xs">Sick Leave (SL)</SelectItem>
                  <SelectItem value="Half Day" className="text-xs">Half Day (First Half)</SelectItem>
                  <SelectItem value="Emergency Leave" className="text-xs">Emergency Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs font-semibold">Start Date</Label>
                <Input
                  type="date"
                  className="h-8 text-xs mt-1"
                  value={leaveForm.start_date}
                  onChange={(e) => setLeaveForm({ ...leaveForm, start_date: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">End Date</Label>
                <Input
                  type="date"
                  className="h-8 text-xs mt-1"
                  value={leaveForm.end_date}
                  onChange={(e) => setLeaveForm({ ...leaveForm, end_date: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold">Reason for Absence</Label>
              <Textarea
                placeholder="State your reason..."
                className="text-xs mt-1 resize-none h-20"
                value={leaveForm.reason}
                onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowLeaveModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={leaveLoading}>
                {leaveLoading && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
        </>
      )}

      {/* Live Camera Face Attendance Modal */}
      <FaceAttendanceDialog
        open={faceModalOpen}
        onOpenChange={setFaceModalOpen}
        actionType={isCheckedIn ? "check-out" : "check-in"}
        employeeName={profile?.first_name || "Pooja Sharma"}
        onSuccess={(record) => {
          if (record.action === "check-in") {
            setIsCheckedIn(true);
            setCheckInTime(record.time);
          } else {
            setIsCheckedIn(false);
          }
        }}
      />
    </div>
  );
}
