import React, { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Phone,
  Landmark,
  KeyRound,
  ShieldCheck,
  Edit3,
  Loader2,
  Calendar,
  Building,
} from "lucide-react";
import { toast } from "sonner";
import { fetchStaffProfile, updateStaffProfile, changeStaffPassword } from "@/lib/services/staff";

export const Route = createFileRoute("/staff/profile")({
  head: () => ({
    meta: [{ title: "My Profile & Security | Vrindavan ERP Staff" }],
  }),
  component: StaffProfilePage,
});

export function StaffProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    bank_name: "",
    account_holder_name: "",
    account_number: "",
    ifsc_code: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await fetchStaffProfile();
      setProfile(data);
      setEditForm({
        first_name: data.first_name || "Pooja",
        last_name: data.last_name || "Sharma",
        mobile: data.mobile || "+91 98290 88776",
        bank_name: data.bank_name || "HDFC Bank Ltd",
        account_holder_name: data.account_holder_name || "Pooja Sharma",
        account_number: data.account_number || "50100456789012",
        ifsc_code: data.ifsc_code || "HDFC0001234",
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to load staff profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateStaffProfile(editForm);
      toast.success("Profile details updated successfully.");
      setShowEditModal(false);
      loadProfile();
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      toast.error("New passwords do not match.");
      return;
    }
    if (passwordForm.new_password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    setSaving(true);
    try {
      await changeStaffPassword({
        old_password: passwordForm.old_password,
        new_password: passwordForm.new_password,
      });
      toast.success("Password changed successfully.");
      setShowPasswordModal(false);
      setPasswordForm({ old_password: "", new_password: "", confirm_password: "" });
    } catch (err: any) {
      toast.error(err.message || "Failed to change password.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-xs">Loading staff profile...</p>
      </div>
    );
  }

  const fullName = `${profile?.first_name || "Pooja"} ${profile?.last_name || "Sharma"}`;
  const initials = fullName.slice(0, 2).toUpperCase();

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Navigation Submenu Tabs */}
      <div className="flex items-center gap-1 border-b pb-2 text-xs font-medium">
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/overview">Overview</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/overview/attendance">Attendance</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/overview/leave">Leave Requests</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/staff/overview/location">Location & Geofence</Link>
        </Button>
        <Button variant="secondary" size="sm" asChild className="font-semibold">
          <Link to="/staff/profile">My Profile</Link>
        </Button>
      </div>

      {/* Profile Overview Card */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 text-lg font-bold bg-primary text-primary-foreground border-2 border-primary/20">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold text-foreground">{fullName}</h1>
                  <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/30">
                    Telecaller / Sales Staff
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{profile?.email || "pooja@vrindavan.com"}</p>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Building className="h-3 w-3 text-primary" />
                    {profile?.department || "Telecalling & Sales"}
                  </span>
                  <span>•</span>
                  <span>Reporting To: {profile?.team_leader || "Vikram Singh"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowEditModal(true)} className="text-xs gap-1.5 h-8">
                <Edit3 className="h-3.5 w-3.5" />
                Edit Profile
              </Button>
              <Button size="sm" onClick={() => setShowPasswordModal(true)} className="text-xs gap-1.5 h-8">
                <KeyRound className="h-3.5 w-3.5" />
                Change Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Personal & Employment Information */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Personal & Employment Information
            </CardTitle>
            <CardDescription className="text-xs">Your verified employment profile</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Full Name:</span>
              <span className="font-semibold text-foreground">{fullName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Work Email:</span>
              <span className="font-semibold text-foreground">{profile?.email || "pooja@vrindavan.com"}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Contact Number:</span>
              <span className="font-semibold text-foreground">{profile?.mobile || "+91 98290 88776"}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Department:</span>
              <span className="font-semibold text-foreground">{profile?.department || "Telecalling & Sales"}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Account Status:</span>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px]">
                Active Employee
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Banking & Salary Payout Details */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Landmark className="h-4 w-4 text-emerald-600" />
              Banking & Salary Settlement Details
            </CardTitle>
            <CardDescription className="text-xs">Account configured for monthly salary and incentive credit</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Bank Name:</span>
              <span className="font-semibold text-foreground">{profile?.bank_name || "HDFC Bank Ltd"}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Account Holder:</span>
              <span className="font-semibold text-foreground">{profile?.account_holder_name || fullName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">Account Number:</span>
              <span className="font-mono font-semibold text-foreground">
                {profile?.account_number ? `•••• •••• ${profile.account_number.slice(-4)}` : "•••• •••• 9012"}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-muted-foreground">IFSC Code:</span>
              <span className="font-mono font-semibold text-foreground">{profile?.ifsc_code || "HDFC0001234"}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Verification Status:</span>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300 text-[10px] gap-1">
                <ShieldCheck className="h-3 w-3" />
                Bank KYC Verified
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-primary" />
              Edit Profile & Banking Details
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs font-semibold">First Name</Label>
                <Input
                  className="h-8 text-xs mt-1"
                  value={editForm.first_name}
                  onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">Last Name</Label>
                <Input
                  className="h-8 text-xs mt-1"
                  value={editForm.last_name}
                  onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold">Mobile Number</Label>
              <Input
                className="h-8 text-xs mt-1"
                value={editForm.mobile}
                onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                required
              />
            </div>

            <div className="pt-2 border-t">
              <p className="font-semibold text-xs text-foreground mb-2">Bank Details</p>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs font-semibold">Bank Name</Label>
                  <Input
                    className="h-8 text-xs mt-1"
                    value={editForm.bank_name}
                    onChange={(e) => setEditForm({ ...editForm, bank_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Account Number</Label>
                  <Input
                    className="h-8 text-xs mt-1"
                    value={editForm.account_number}
                    onChange={(e) => setEditForm({ ...editForm, account_number: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">IFSC Code</Label>
                  <Input
                    className="h-8 text-xs mt-1 uppercase"
                    value={editForm.ifsc_code}
                    onChange={(e) => setEditForm({ ...editForm, ifsc_code: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={saving}>
                {saving && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Change Password Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base font-bold flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-primary" />
              Change Password
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-3 text-xs">
            <div>
              <Label className="text-xs font-semibold">Current Password</Label>
              <Input
                type="password"
                className="h-8 text-xs mt-1"
                value={passwordForm.old_password}
                onChange={(e) => setPasswordForm({ ...passwordForm, old_password: e.target.value })}
                required
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">New Password</Label>
              <Input
                type="password"
                className="h-8 text-xs mt-1"
                value={passwordForm.new_password}
                onChange={(e) => setPasswordForm({ ...passwordForm, new_password: e.target.value })}
                required
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">Confirm New Password</Label>
              <Input
                type="password"
                className="h-8 text-xs mt-1"
                value={passwordForm.confirm_password}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm_password: e.target.value })}
                required
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={saving}>
                {saving && <Loader2 className="h-3 w-3 animate-spin mr-1" />}
                Update Password
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
