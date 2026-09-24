import React, { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LogOut,
  LayoutDashboard,
  Users,
  FileCheck,
  Camera,
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Building,
  Briefcase,
  ShieldCheck,
  Key,
  CheckCircle2,
  Lock,
  Edit,
  Clock,
  MapPin,
  CalendarDays,
  User,
  ScanFace,
} from "lucide-react";
import { FaceAttendanceDialog } from "@/components/attendance/FaceAttendanceDialog";
import { useAuth } from "@/lib/services/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/hr-dashboard/profile")({
  head: () => ({
    meta: [{ title: "HR Manager Profile | HR Dashboard" }],
  }),
  component: HrProfilePage,
});

function HrProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const [showFaceModal, setShowFaceModal] = useState(false);
  const [punchAction, setPunchAction] = useState<"check-in" | "check-out">("check-in");
  const [selfPunch, setSelfPunch] = useState<{
    hasCheckedIn: boolean;
    checkInTime: string | null;
    hasCheckedOut: boolean;
    checkOutTime: string | null;
  }>(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("hr_self_attendance") : null;
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      hasCheckedIn: true,
      checkInTime: "09:28 AM",
      hasCheckedOut: false,
      checkOutTime: null,
    };
  });

  const handleSelfPunchSuccess = (record: {
    action: "check-in" | "check-out";
    time: string;
    status: "Present" | "Absent";
    confidence: number;
    photo?: string;
  }) => {
    const timeStr = record.time || new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    if (record.action === "check-in") {
      const up = { ...selfPunch, hasCheckedIn: true, checkInTime: timeStr };
      setSelfPunch(up);
      localStorage.setItem("hr_self_attendance", JSON.stringify(up));
      toast.success(`Face Check-In recorded at ${timeStr} (${record.confidence}% match). Status: Present!`);
    } else {
      const up = { ...selfPunch, hasCheckedOut: true, checkOutTime: timeStr };
      setSelfPunch(up);
      localStorage.setItem("hr_self_attendance", JSON.stringify(up));
      toast.success(`Face Check-Out recorded at ${timeStr}. Attendance completed!`);
    }
  };

  // Profile data
  const [profile, setProfile] = useState({
    name: user?.name || "HR Administrator",
    email: user?.email || "hr@vrindavan.com",
    phone: "+91 98290 55443",
    empId: "EMP-HR001",
    department: "Human Resources & People Ops",
    designation: "Senior HR Manager & Personnel Auditor",
    status: "Active",
    joiningDate: "15 Jan 2024",
    lastLogin: "Today, 09:30 AM",
    dob: "1992-08-14",
    gender: "Male",
    bloodGroup: "O+",
    address: "Block B, Sunrise Residency, Mathura Road",
    city: "Vrindavan",
    state: "Uttar Pradesh",
    pincode: "281121",
    shift: "General Day Shift (09:30 AM - 06:30 PM)",
    workLocation: "Vrindavan Central Campus",
  });

  // Edit form state
  const [editForm, setEditForm] = useState({ ...profile });

  // Password form state
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      toast.success("Profile photo updated successfully!");
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.name.trim() || !editForm.email.trim()) {
      toast.error("Name and Email are required.");
      return;
    }
    setProfile({ ...editForm });
    setShowEditDialog(false);
    toast.success("Profile details updated successfully!");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowPasswordDialog(false);
    toast.success("Password changed successfully! Next login requires new credentials.");
  };

  const handleLogoutSession = () => {
    logout();
    toast.success("You have been securely signed out.");
    navigate({ to: "/login" });
  };

  return (
    <div className="space-y-5 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <User className="size-6 text-primary" />
            HR Manager Profile
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage your HR credentials, administrative authorizations, and account security.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" asChild size="sm" className="h-8 text-xs gap-1.5">
            <Link to="/hr-dashboard">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEditForm({ ...profile });
              setShowEditDialog(true);
            }}
            className="h-8 text-xs gap-1.5"
          >
            <Edit className="h-3.5 w-3.5" /> Edit Profile
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPasswordDialog(true)}
            className="h-8 text-xs gap-1.5"
          >
            <Lock className="h-3.5 w-3.5" /> Change Password
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Profile Info Card */}
        <Card className="lg:col-span-2 shadow-xs border overflow-hidden">
          {/* Cover gradient banner */}
          <div className="h-28 bg-gradient-to-r from-primary/30 via-indigo-500/20 to-primary/10 relative" />

          <CardHeader className="relative pt-0 px-4 sm:px-6 pb-2">
            <div className="flex flex-col sm:flex-row sm:items-end -mt-12 gap-4">
              {/* Avatar with Camera Icon */}
              <div className="relative self-start sm:self-auto">
                <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={profile.name} />
                  ) : null}
                  <AvatarFallback className="text-3xl font-extrabold bg-primary text-primary-foreground">
                    {profile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="hr-avatar-upload"
                  className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 shadow transition-colors"
                  title="Upload profile photo"
                >
                  <Camera className="h-3.5 w-3.5" />
                  <input
                    id="hr-avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>

              {/* Title & Badges */}
              <div className="pb-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <CardTitle className="text-xl font-bold">{profile.name}</CardTitle>
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold"
                  >
                    {profile.status}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-mono text-primary bg-primary/5">
                    {profile.empId}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{profile.email} • {profile.phone}</p>
                <Badge className="text-[10px] bg-primary/15 text-primary hover:bg-primary/20 font-semibold mt-0.5">
                  {profile.designation}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-4 sm:px-6 pb-6 pt-3 space-y-5">
            <Separator />

            {/* Official Personnel Details */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-primary" />
                Administrative & Official Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-muted/20 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Department
                  </span>
                  <p className="font-semibold text-xs text-foreground mt-0.5">{profile.department}</p>
                </div>

                <div className="bg-muted/20 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Access Level
                  </span>
                  <p className="font-semibold text-xs text-primary mt-0.5">HR SuperAdmin & Auditor</p>
                </div>

                <div className="bg-muted/20 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Work Location
                  </span>
                  <p className="font-semibold text-xs text-foreground mt-0.5">{profile.workLocation}</p>
                </div>

                <div className="bg-muted/20 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Assigned Shift
                  </span>
                  <p className="font-semibold text-xs text-foreground mt-0.5">{profile.shift}</p>
                </div>

                <div className="bg-muted/20 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Date Joined
                  </span>
                  <p className="font-semibold text-xs text-foreground mt-0.5">{profile.joiningDate}</p>
                </div>

                <div className="bg-muted/20 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Last Session Login
                  </span>
                  <p className="font-semibold text-xs text-emerald-600 mt-0.5">{profile.lastLogin}</p>
                </div>
              </div>
            </div>

            {/* Personal Bio & Residential Information */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary" />
                Personal Profile & Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="bg-muted/20 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Date of Birth
                  </span>
                  <p className="font-semibold text-xs text-foreground mt-0.5">{profile.dob}</p>
                </div>

                <div className="bg-muted/20 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Gender
                  </span>
                  <p className="font-semibold text-xs text-foreground mt-0.5">{profile.gender}</p>
                </div>

                <div className="bg-muted/20 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    Blood Group
                  </span>
                  <p className="font-semibold text-xs text-foreground mt-0.5">{profile.bloodGroup}</p>
                </div>

                <div className="bg-muted/20 p-2.5 rounded-lg border">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    City & State
                  </span>
                  <p className="font-semibold text-xs text-foreground mt-0.5">
                    {profile.city}, {profile.state}
                  </p>
                </div>
              </div>

              <div className="bg-muted/20 p-2.5 rounded-lg border mt-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Residential Address
                </span>
                <p className="font-medium text-xs text-foreground mt-0.5">
                  {profile.address}, {profile.city} - {profile.pincode}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Workforce Snapshot & Quick Actions */}
        <div className="space-y-4">
          {/* HR Self Face Attendance Punch Card */}
          <Card className="shadow-xs border border-primary/20 bg-gradient-to-br from-card via-primary/[0.02] to-muted/20">
            <CardHeader className="py-3 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <ScanFace className="h-4 w-4 text-primary" />
                My Face Attendance
              </CardTitle>
              {selfPunch.hasCheckedIn ? (
                <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Punched In
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-300 bg-amber-50">
                  Not Punched In
                </Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-3 pt-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-muted/40 rounded-lg border">
                  <span className="text-muted-foreground text-[10px] uppercase font-bold block">Check-In</span>
                  <span className="font-bold text-emerald-600">{selfPunch.checkInTime || "Pending"}</span>
                </div>
                <div className="p-2 bg-muted/40 rounded-lg border">
                  <span className="text-muted-foreground text-[10px] uppercase font-bold block">Check-Out</span>
                  <span className="font-bold text-muted-foreground">{selfPunch.checkOutTime || "Pending"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    setPunchAction("check-in");
                    setShowFaceModal(true);
                  }}
                  size="sm"
                  className="flex-1 h-8 text-xs font-bold gap-1 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  <Camera className="h-3.5 w-3.5" />
                  Face Check-In
                </Button>
                <Button
                  onClick={() => {
                    setPunchAction("check-out");
                    setShowFaceModal(true);
                  }}
                  variant="outline"
                  size="sm"
                  className="flex-1 h-8 text-xs font-semibold gap-1 border-rose-300 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
                >
                  <Clock className="h-3.5 w-3.5" />
                  Face Check-Out
                </Button>
              </div>

              <div className="pt-0.5">
                <Button variant="ghost" size="sm" asChild className="w-full h-7 text-[11px] text-muted-foreground hover:text-foreground">
                  <Link to="/hr-dashboard/attendance/face-punch">
                    View Full Biometrics & History →
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Workforce Snapshot */}
          <Card className="shadow-xs border">
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Workforce Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 pt-3">
              <div className="flex items-center justify-between p-2.5 bg-muted/30 rounded-lg border">
                <span className="text-xs text-muted-foreground font-medium">Total Registered Staff</span>
                <span className="text-lg font-extrabold text-primary">28</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-muted/30 rounded-lg border">
                <span className="text-xs text-muted-foreground font-medium">Today&apos;s Biometric Punches</span>
                <span className="text-lg font-extrabold text-emerald-600">25</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-muted/30 rounded-lg border">
                <span className="text-xs text-muted-foreground font-medium">Pending Leave Requests</span>
                <span className="text-lg font-extrabold text-amber-600">3</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Shortcuts */}
          <Card className="shadow-xs border">
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-1 pt-2 pb-2">
              <Button variant="ghost" className="justify-start text-xs h-8" asChild>
                <Link to="/hr-dashboard">
                  <LayoutDashboard className="mr-2 h-3.5 w-3.5 text-primary" /> Central HR Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start text-xs h-8" asChild>
                <Link to="/hr-dashboard/employees/all">
                  <Users className="mr-2 h-3.5 w-3.5 text-primary" /> Employees Master Directory
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start text-xs h-8" asChild>
                <Link to="/hr-dashboard/attendance/list">
                  <FileCheck className="mr-2 h-3.5 w-3.5 text-primary" /> Attendance Records
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start text-xs h-8" asChild>
                <Link to="/hr-dashboard/settings/holidays">
                  <CalendarDays className="mr-2 h-3.5 w-3.5 text-primary" /> Holiday Calendar
                </Link>
              </Button>
              <Separator className="my-1" />
              <Button
                variant="ghost"
                className="justify-start text-xs h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 font-medium"
                onClick={handleLogoutSession}
              >
                <LogOut className="mr-2 h-3.5 w-3.5" /> Logout Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto p-5">
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Edit className="h-4 w-4 text-primary" />
              Edit HR Profile Details
            </DialogTitle>
            <DialogDescription className="text-xs">
              Update your personal bio, contact numbers, and address.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-3 pt-2 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Full Name</Label>
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="h-8 text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">Official Email</Label>
                <Input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="h-8 text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Mobile Number</Label>
                <Input
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="h-8 text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">Date of Birth</Label>
                <Input
                  type="date"
                  value={editForm.dob}
                  onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">Blood Group</Label>
                <Select
                  value={editForm.bloodGroup}
                  onValueChange={(val) => setEditForm({ ...editForm, bloodGroup: val })}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+" className="text-xs">A+</SelectItem>
                    <SelectItem value="A-" className="text-xs">A-</SelectItem>
                    <SelectItem value="B+" className="text-xs">B+</SelectItem>
                    <SelectItem value="B-" className="text-xs">B-</SelectItem>
                    <SelectItem value="O+" className="text-xs">O+</SelectItem>
                    <SelectItem value="O-" className="text-xs">O-</SelectItem>
                    <SelectItem value="AB+" className="text-xs">AB+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Residential Address</Label>
              <Textarea
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                className="text-xs min-h-[60px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">City</Label>
                <Input
                  value={editForm.city}
                  onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">State</Label>
                <Input
                  value={editForm.state}
                  onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">PIN Code</Label>
                <Input
                  value={editForm.pincode}
                  onChange={(e) => setEditForm({ ...editForm, pincode: e.target.value })}
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <DialogFooter className="pt-3 border-t">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowEditDialog(false)} className="h-8 text-xs">
                Cancel
              </Button>
              <Button type="submit" size="sm" className="h-8 text-xs font-semibold bg-primary text-primary-foreground">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="w-[92vw] sm:max-w-md p-5">
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              Change Login Password
            </DialogTitle>
            <DialogDescription className="text-xs">
              Ensure your new password contains at least 6 characters.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePasswordSubmit} className="space-y-3 pt-2 text-xs">
            <div className="space-y-1">
              <Label className="text-xs font-semibold">Current Password</Label>
              <Input
                type="password"
                placeholder="Enter current password"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                className="h-8 text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">New Password</Label>
              <Input
                type="password"
                placeholder="Enter at least 6 characters"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className="h-8 text-xs"
                required
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Confirm New Password</Label>
              <Input
                type="password"
                placeholder="Re-enter new password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                className="h-8 text-xs"
                required
              />
            </div>

            <DialogFooter className="pt-3 border-t">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowPasswordDialog(false)}
                className="h-8 text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="h-8 text-xs font-semibold bg-primary text-primary-foreground">
                Update Password
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Face Biometric Punch Modal */}
      <FaceAttendanceDialog
        open={showFaceModal}
        onOpenChange={setShowFaceModal}
        actionType={punchAction}
        employeeName={profile.name || "HR Manager"}
        onSuccess={handleSelfPunchSuccess}
      />
    </div>
  );
}
