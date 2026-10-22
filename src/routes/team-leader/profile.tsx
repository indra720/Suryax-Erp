import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  CreditCard,
  Fingerprint,
  GraduationCap,
  Landmark,
  Hash,
  Wallet,
  Building2,
  Pencil,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  fetchTeamLeaderProfile,
  updateTeamLeaderProfile,
  changeTeamLeaderPassword,
} from "@/lib/services/team-leader";

export const Route = createFileRoute("/team-leader/profile")({
  head: () => ({
    meta: [
      { title: "Team Leader Profile & Account | Vrindavan ERP" },
      { name: "description", content: "Team leader profile details, slab tiers, and password security." },
    ],
  }),
  component: TeamLeaderProfilePage,
});

export function TeamLeaderProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [editForm, setEditForm] = useState<any>({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await fetchTeamLeaderProfile();
      setProfile(data);
      setEditForm(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // 1. Password change if requested
      if (newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
          toast.error("New password and confirm password do not match.");
          setSaving(false);
          return;
        }
        await changeTeamLeaderPassword(newPassword, confirmPassword);
        toast.success("Password updated successfully.");
      }

      // 2. Profile updates
      const fd = new FormData();
      for (const k in editForm) {
        if (editForm[k] && typeof editForm[k] === "string") {
          fd.append(k, editForm[k]);
        }
      }
      await updateTeamLeaderProfile(fd);
      toast.success("Profile saved successfully.");
      setIsEditDialogOpen(false);
      setNewPassword("");
      setConfirmPassword("");
      loadProfile();
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-xs text-gray-500">
        Loading Team Leader profile credentials...
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#331fa3] to-[#6732F2] p-5 sm:p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-bold">
              {profile?.name ? profile.name[0].toUpperCase() : "T"}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{profile?.name || "Team Leader"}</h1>
              <p className="text-xs text-white/80 flex items-center gap-1.5 mt-0.5">
                <Briefcase className="size-3.5" /> ID: {profile?.team_leader_id || "TL-VRIN-01"}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-white/20 hover:bg-white/30 text-white text-[10px] border-none font-medium">
                  {profile?.achived_slab || "Platinum Slab"}
                </Badge>
                <Badge className="bg-emerald-500/80 text-white text-[10px] border-none font-medium">
                  Active Leader
                </Badge>
              </div>
            </div>
          </div>

          <Button
            onClick={() => {
              setEditForm(profile);
              setIsEditDialogOpen(true);
            }}
            className="bg-white hover:bg-white/90 text-[#331fa3] font-semibold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Pencil className="size-3.5" /> Edit Profile &amp; Password
          </Button>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Personal Details */}
        <Card className="border rounded-xl bg-white shadow-xs">
          <CardHeader className="p-4 border-b">
            <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <User className="size-4 text-[#6732F2]" />
              Personal &amp; Contact Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-gray-500 flex items-center gap-1.5"><Mail className="size-3.5" /> Email Address</span>
              <span className="font-semibold text-gray-900">{profile?.email}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-gray-500 flex items-center gap-1.5"><Phone className="size-3.5" /> Mobile Contact</span>
              <span className="font-semibold text-gray-900 font-mono">{profile?.mobile}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-gray-500 flex items-center gap-1.5"><Calendar className="size-3.5" /> Date of Birth</span>
              <span className="font-semibold text-gray-900">{profile?.dob || "1990-06-15"}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-gray-500 flex items-center gap-1.5"><CreditCard className="size-3.5" /> PAN Card</span>
              <span className="font-semibold text-gray-900 font-mono">{profile?.pancard || "ABCDE1234F"}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-gray-500 flex items-center gap-1.5"><Fingerprint className="size-3.5" /> Aadhar Number</span>
              <span className="font-semibold text-gray-900 font-mono">{profile?.aadharCard || "8765 4321 0987"}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-gray-500 flex items-center gap-1.5"><GraduationCap className="size-3.5" /> Qualification</span>
              <span className="font-semibold text-gray-900">{profile?.degree || "MBA - Marketing"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Banking & Performance Credentials */}
        <Card className="border rounded-xl bg-white shadow-xs">
          <CardHeader className="p-4 border-b">
            <CardTitle className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Landmark className="size-4 text-[#6732F2]" />
              Banking &amp; Incentive Tier
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-gray-500 flex items-center gap-1.5"><Landmark className="size-3.5" /> Bank Name</span>
              <span className="font-semibold text-gray-900">{profile?.bank_name || "HDFC Bank Ltd"}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-gray-500 flex items-center gap-1.5"><Hash className="size-3.5" /> Account Number</span>
              <span className="font-semibold text-gray-900 font-mono">{profile?.account_number || "50100234567890"}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-gray-500 flex items-center gap-1.5"><Hash className="size-3.5" /> IFSC Code</span>
              <span className="font-semibold text-gray-900 font-mono">{profile?.ifsc_code || "HDFC0001234"}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-gray-500 flex items-center gap-1.5"><Wallet className="size-3.5" /> Monthly Salary</span>
              <span className="font-semibold text-gray-900">₹{parseFloat(profile?.salary || "65000").toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b">
              <span className="text-gray-500 flex items-center gap-1.5"><Award className="size-3.5" /> Achieved Slab</span>
              <span className="font-semibold text-emerald-600">{profile?.achived_slab || "Platinum Slab - 2.0%"}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-gray-500 flex items-center gap-1.5"><Building2 className="size-3.5" /> Location / Address</span>
              <span className="font-semibold text-gray-900 truncate max-w-xs">{profile?.city || "Jaipur"}, {profile?.state || "Rajasthan"}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[94vw] sm:max-w-xl md:max-w-2xl lg:max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col rounded-2xl shadow-2xl bg-card border-border">
          <DialogHeader className="p-4 sm:p-6 border-b border-border bg-muted/20 shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-bold">Edit Team Leader Profile</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
              Update personal information, UPI settlement details, address, and password credentials.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="flex-1 overflow-hidden flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
              <div className="px-4 sm:px-6 pt-3 border-b border-border shrink-0">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="personal" className="text-xs sm:text-sm">Profile Details</TabsTrigger>
                  <TabsTrigger value="security" className="text-xs sm:text-sm">Password &amp; Security</TabsTrigger>
                </TabsList>
              </div>

              <div className="px-5 sm:px-6 py-4 space-y-4 flex-1 overflow-y-auto scrollbar-thin">
                {activeTab === "personal" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Full Name</Label>
                      <Input
                        name="name"
                        value={editForm.name || ""}
                        onChange={handleEditChange}
                        className="h-10 sm:h-11 text-sm rounded-xl"
                      />
                    </div>
                    <div>
                      <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Email Address</Label>
                      <Input
                        name="email"
                        value={editForm.email || ""}
                        onChange={handleEditChange}
                        className="h-10 sm:h-11 text-sm rounded-xl"
                      />
                    </div>
                    <div>
                      <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Mobile Number (10 digits)</Label>
                      <Input
                        type="tel"
                        maxLength={10}
                        name="mobile"
                        value={editForm.mobile || ""}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                          })
                        }
                        placeholder="10-digit mobile"
                        className="h-10 sm:h-11 text-sm rounded-xl"
                      />
                    </div>
                    <div>
                      <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">UPI ID</Label>
                      <Input
                        name="upi_id"
                        value={editForm.upi_id || ""}
                        onChange={handleEditChange}
                        placeholder="username@upi"
                        className="h-10 sm:h-11 text-sm rounded-xl"
                      />
                    </div>
                    <div>
                      <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">City</Label>
                      <Input
                        name="city"
                        value={editForm.city || ""}
                        onChange={handleEditChange}
                        className="h-10 sm:h-11 text-sm rounded-xl"
                      />
                    </div>
                    <div>
                      <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Pincode</Label>
                      <Input
                        name="pincode"
                        maxLength={6}
                        value={editForm.pincode || ""}
                        onChange={handleEditChange}
                        className="h-10 sm:h-11 text-sm rounded-xl"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Permanent / Operational Address</Label>
                      <Textarea
                        name="address"
                        value={editForm.address || ""}
                        onChange={handleEditChange}
                        className="min-h-[80px] text-sm rounded-xl p-3"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-4 max-w-lg">
                    <div>
                      <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">New Password</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Leave blank to keep unchanged"
                          className="h-10 sm:h-11 text-sm rounded-xl pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs sm:text-sm font-semibold mb-1.5 block">Confirm New Password</Label>
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        className="h-10 sm:h-11 text-sm rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="px-5 sm:px-6 py-3.5 border-t border-border bg-muted/20 shrink-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="w-full sm:w-auto rounded-xl h-10 px-5 text-sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto rounded-xl h-10 px-6 text-sm bg-brand hover:bg-brand/90 text-white font-semibold shadow-md"
                >
                  {saving ? "Saving Changes..." : "Save Profile"}
                </Button>
              </DialogFooter>
            </Tabs>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
