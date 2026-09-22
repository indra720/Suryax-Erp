import React, { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Users,
  Eye,
  Check,
  XCircle,
  MapPin,
  Phone,
  Briefcase,
  PlusCircle,
  Pencil,
  Calendar,
  Lock,
  Mail,
  Building2,
  RefreshCw,
  Search,
  EyeOff,
  Filter,
  X,
  CreditCard,
  Fingerprint,
  FileText,
  GraduationCap,
  Landmark,
  Hash,
  Wallet,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  User,
} from "lucide-react";
import {
  fetchAdminTeamLeaders,
  toggleUserActiveStatus,
  addTeamLeaderUser,
  editTeamLeader,
} from "@/lib/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/users/team-leader")({
  head: () => ({
    meta: [{ title: "Admin - Team Leaders | Vrindavan ERP" }],
  }),
  component: AdminTeamLeaderPage,
});

const kpiCards = [
  { title: "Total Leads", key: "total_leads", icon: Users, color: "text-rose-500", bg: "bg-rose-50 border-rose-200" },
  { title: "Total Visit", key: "total_visits_leads", icon: Eye, color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-200" },
  { title: "Interested", key: "total_interested_leads", icon: Check, color: "text-teal-500", bg: "bg-teal-50 border-teal-200" },
  { title: "Not Interested", key: "total_not_interested_leads", icon: XCircle, color: "text-red-500", bg: "bg-red-50 border-red-200" },
  { title: "Other Location", key: "total_other_location_leads", icon: MapPin, color: "text-amber-500", bg: "bg-amber-50 border-amber-200" },
  { title: "Not Picked", key: "total_not_picked_leads", icon: Phone, color: "text-purple-500", bg: "bg-purple-50 border-purple-200" },
];

const initialFormData = {
  id: "",
  name: "",
  email: "",
  password: "",
  mobile: "",
  dob: "",
  address: "",
  city: "",
  state: "Uttar Pradesh",
  pincode: "",
  degree: "",
  pancard: "",
  aadharCard: "",
  bank_name: "",
  account_number: "",
  ifsc_code: "",
  upi_id: "",
  salary: "",
};

export function AdminTeamLeaderPage() {
  const [teamLeaders, setTeamLeaders] = useState<any[]>([]);
  const [kpis, setKpis] = useState<Record<string, number>>({
    total_leads: 191,
    total_visits_leads: 37,
    total_interested_leads: 54,
    total_not_interested_leads: 28,
    total_other_location_leads: 19,
    total_not_picked_leads: 35,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expandedRowId, setExpandedRowId] = useState<number | string | null>(null);

  // Tabs for Add Form
  const [activeTab, setActiveTab] = useState<"personal" | "account">("personal");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Edit State
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminTeamLeaders(startDate, endDate);
      if (res) {
        if (res.team_leaders) setTeamLeaders(res.team_leaders);
        else if (Array.isArray(res)) setTeamLeaders(res);
        else if (res.results) setTeamLeaders(res.results);

        if (res.kpis) setKpis(res.kpis);
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Failed to load Team Leaders from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [startDate, endDate]);

  const handleToggleStatus = async (id: number | string, currentStatus: boolean) => {
    try {
      await toggleUserActiveStatus(id, "team-leader", !currentStatus);
      toast.success("Team leader status updated successfully!");
      setTeamLeaders((prev) =>
        prev.map((tl) => (tl.id === id ? { ...tl, is_active: !currentStatus } : tl))
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to toggle status");
    }
  };

  const handleOpenAddForm = () => {
    setFormData(initialFormData);
    setActiveTab("personal");
    setIsAddFormOpen(true);
  };

  const handleOpenEditForm = (tl: any) => {
    setEditingUser({
      id: tl.id,
      name: tl.name || "",
      email: tl.email || "",
      mobile: tl.mobile || tl.phone || "",
      password: "",
    });
    setIsEditFormOpen(true);
  };

  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.password) {
      toast.error("Please fill required fields (Name, Email, Mobile, Password).");
      return;
    }
    setSubmitting(true);
    try {
      await addTeamLeaderUser(formData);
      toast.success("Team Leader added successfully!");
      setIsAddFormOpen(false);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to add team leader.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser.name || !editingUser.email || !editingUser.mobile) {
      toast.error("Please fill required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await editTeamLeader(editingUser.id, editingUser);
      toast.success("Team Leader updated successfully!");
      setIsEditFormOpen(false);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to update.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = teamLeaders.filter((tl) => {
    const q = searchQuery.toLowerCase();
    return (
      tl.name?.toLowerCase().includes(q) ||
      tl.email?.toLowerCase().includes(q) ||
      tl.mobile?.includes(q)
    );
  });

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Briefcase className="size-6 text-brand" />
            Branch Team Leaders
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Manage branch team leaders, monitor calling KPIs &amp; allocate telecallers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            className="flex items-center gap-1.5 text-xs font-semibold"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={handleOpenAddForm}
            className="flex items-center gap-1.5 text-xs font-semibold bg-brand hover:bg-brand-dark text-white"
          >
            <PlusCircle className="size-4" />
            Add Team Leader
          </Button>
        </div>
      </div>

      {/* KPI Cards with Icons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          const val = kpis[kpi.key] ?? 0;
          return (
            <Card key={kpi.key} className={`border rounded-xl shadow-xs ${kpi.bg}`}>
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-600 truncate">{kpi.title}</span>
                  <div className="p-1 rounded bg-white/70 shadow-2xs">
                    <Icon className={`size-4 ${kpi.color}`} />
                  </div>
                </div>
                <div className={`mt-2 text-xl font-black ${kpi.color}`}>{val}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filter and Search Bar with Clickable Date Inputs */}
      <Card className="border rounded-xl bg-white shadow-xs">
        <CardContent className="p-3.5 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Calendar className="size-4 text-brand" />
              <span className="font-semibold">Start Date:</span>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                onClick={(e) => e.currentTarget.showPicker?.()}
                className="h-8 text-xs w-36 cursor-pointer bg-gray-50 border-gray-300 font-medium"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <Calendar className="size-4 text-brand" />
              <span className="font-semibold">End Date:</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                onClick={(e) => e.currentTarget.showPicker?.()}
                className="h-8 text-xs w-36 cursor-pointer bg-gray-50 border-gray-300 font-medium"
              />
            </div>
            {(startDate || endDate) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { setStartDate(""); setEndDate(""); }}
                className="h-8 text-xs text-red-600"
              >
                <X className="size-3.5 mr-1" /> Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Team Leaders Table with Exact CrmAttendance2 Columns */}
      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">S.N.</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Admin</th>
                <th className="px-4 py-3">Mobile No</th>
                <th className="px-4 py-3">Created Date</th>
                <th className="px-4 py-3">Leads Report</th>
                <th className="px-4 py-3 text-center">Active / Inactive</th>
                <th className="px-4 py-3 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    Loading team leaders...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    No matching records found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3 font-semibold text-gray-500">{index + 1}.</td>
                    <td className="px-4 py-3 font-bold text-gray-900">{user.name}</td>
                    <td className="px-4 py-3 text-gray-600 font-medium">{user.admin?.name || "Branch Admin"}</td>
                    <td className="px-4 py-3 font-mono text-gray-600">{user.mobile || user.phone || "N/A"}</td>
                    <td className="px-4 py-3 font-mono text-gray-500">
                      {user.created_date ? new Date(user.created_date).toLocaleDateString("en-GB") : "2026-03-20"}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-brand"
                        onChange={(e) => {
                          if (e.target.value) window.location.assign(e.target.value);
                        }}
                      >
                        <option value="">Select Type</option>
                        <option value="/admin/leads-report/interested">Interested</option>
                        <option value="/admin/leads-report/not-interested">Not Interested</option>
                        <option value="/admin/leads-report/other-location">Other Location</option>
                        <option value="/admin/leads-report/lost">Lost</option>
                        <option value="/admin/leads-report/visit">Visit</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <Switch
                          checked={user.is_active}
                          onCheckedChange={() => handleToggleStatus(user.id, user.is_active)}
                        />
                        <span className={`text-[10px] font-bold ${user.is_active ? "text-emerald-600" : "text-gray-400"}`}>
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEditForm(user)}
                        className="h-8 px-2 text-brand hover:text-brand-dark"
                      >
                        <Pencil className="size-3.5 mr-1" />
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Complete Multi-Tab Add Team Leader Dialog (Exact CrmAttendance2 Fields) */}
      <Dialog open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
        <DialogContent className="sm:max-w-3xl w-[calc(100vw-2rem)] max-h-[90vh] p-0 rounded-2xl shadow-2xl flex flex-col bg-white">
          <DialogHeader className="p-6 pb-4 border-b flex-shrink-0">
            <DialogTitle className="text-xl font-bold text-gray-900">Add New Team Leader</DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              Fill in personal and bank account details below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddSubmit} className="flex-1 flex flex-col min-h-0">
            {/* Tabs Header */}
            <div className="px-6 pt-3 flex border-b gap-4">
              <button
                type="button"
                onClick={() => setActiveTab("personal")}
                className={`pb-2.5 text-xs font-bold border-b-2 transition-colors ${
                  activeTab === "personal"
                    ? "border-brand text-brand"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Personal Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("account")}
                className={`pb-2.5 text-xs font-bold border-b-2 transition-colors ${
                  activeTab === "account"
                    ? "border-brand text-brand"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Account Details
              </button>
            </div>

            {/* Tabs Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {activeTab === "personal" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <Label className="font-semibold text-gray-700">Name *</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        required
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleAddFormChange}
                        className="pl-9 h-10 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">E-Mail Address *</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        type="email"
                        required
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleAddFormChange}
                        className="pl-9 h-10 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Password *</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        required
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleAddFormChange}
                        className="pl-9 pr-9 h-10 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Mobile Number *</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        required
                        name="mobile"
                        placeholder="9876543210"
                        value={formData.mobile}
                        onChange={handleAddFormChange}
                        className="pl-9 h-10 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Date of Birth</Label>
                    <div className="relative mt-1">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleAddFormChange}
                        onClick={(e) => e.currentTarget.showPicker?.()}
                        className="pl-9 h-10 text-xs cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Pan Card Number</Label>
                    <div className="relative mt-1">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        name="pancard"
                        placeholder="ABCDE1234F"
                        value={formData.pancard}
                        onChange={handleAddFormChange}
                        className="pl-9 h-10 text-xs uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Aadhar Card Number</Label>
                    <div className="relative mt-1">
                      <Fingerprint className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        name="aadharCard"
                        placeholder="1234 5678 9012"
                        value={formData.aadharCard}
                        onChange={handleAddFormChange}
                        className="pl-9 h-10 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Degree / Qualification</Label>
                    <div className="relative mt-1">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        name="degree"
                        placeholder="B.Tech / MBA / Graduate"
                        value={formData.degree}
                        onChange={handleAddFormChange}
                        className="pl-9 h-10 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">City</Label>
                    <div className="relative mt-1">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        name="city"
                        placeholder="Mathura / Vrindavan"
                        value={formData.city}
                        onChange={handleAddFormChange}
                        className="pl-9 h-10 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">State</Label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleAddFormChange}
                      className="w-full mt-1 border rounded-md h-10 px-3 text-xs outline-none focus:border-brand"
                    >
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Rajasthan">Rajasthan</option>
                    </select>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Monthly Salary (₹)</Label>
                    <div className="relative mt-1">
                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        name="salary"
                        placeholder="e.g. 50000"
                        value={formData.salary}
                        onChange={handleAddFormChange}
                        className="pl-9 h-10 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "account" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <Label className="font-semibold text-gray-700">Bank Account Number</Label>
                    <div className="relative mt-1">
                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        name="account_number"
                        placeholder="e.g. 123456789012"
                        value={formData.account_number}
                        onChange={handleAddFormChange}
                        className="pl-9 h-10 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">UPI ID</Label>
                    <div className="relative mt-1">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        name="upi_id"
                        placeholder="name@okaxis"
                        value={formData.upi_id}
                        onChange={handleAddFormChange}
                        className="pl-9 h-10 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Bank Name</Label>
                    <div className="relative mt-1">
                      <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        name="bank_name"
                        placeholder="e.g. State Bank of India"
                        value={formData.bank_name}
                        onChange={handleAddFormChange}
                        className="pl-9 h-10 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">IFSC Code</Label>
                    <div className="relative mt-1">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        name="ifsc_code"
                        placeholder="SBIN0001234"
                        value={formData.ifsc_code}
                        onChange={handleAddFormChange}
                        className="pl-9 h-10 text-xs uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Pincode</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        name="pincode"
                        placeholder="281001"
                        value={formData.pincode}
                        onChange={handleAddFormChange}
                        className="pl-9 h-10 text-xs"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="font-semibold text-gray-700">Full Residential Address</Label>
                    <Textarea
                      name="address"
                      rows={3}
                      placeholder="Street, locality, landmark..."
                      value={formData.address}
                      onChange={handleAddFormChange}
                      className="mt-1 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Dialog Footer */}
            <DialogFooter className="p-4 border-t bg-gray-50 flex justify-between w-full">
              {activeTab === "personal" ? (
                <div></div>
              ) : (
                <Button type="button" variant="outline" size="sm" onClick={() => setActiveTab("personal")}>
                  <ArrowLeft className="size-3.5 mr-1.5" /> Previous
                </Button>
              )}

              {activeTab === "personal" ? (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setActiveTab("account")}
                  className="bg-brand text-white hover:bg-brand-dark"
                >
                  Next <ArrowRight className="size-3.5 ml-1.5" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="sm"
                  disabled={submitting}
                  className="bg-brand text-white hover:bg-brand-dark font-semibold"
                >
                  {submitting ? "Saving..." : "Save Team Leader"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Team Leader Dialog */}
      {editingUser && (
        <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
          <DialogContent className="sm:max-w-md bg-white border rounded-xl shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-base font-bold text-gray-900">Edit Team Leader</DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Update details for {editingUser.name}.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleEditSubmit} className="space-y-3 py-2 text-xs">
              <div>
                <Label className="font-semibold text-gray-700">Name *</Label>
                <Input
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="mt-1 h-9 text-xs"
                />
              </div>

              <div>
                <Label className="font-semibold text-gray-700">Email *</Label>
                <Input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="mt-1 h-9 text-xs"
                />
              </div>

              <div>
                <Label className="font-semibold text-gray-700">Mobile *</Label>
                <Input
                  required
                  value={editingUser.mobile}
                  onChange={(e) => setEditingUser({ ...editingUser, mobile: e.target.value })}
                  className="mt-1 h-9 text-xs"
                />
              </div>

              <div>
                <Label className="font-semibold text-gray-700">New Password (optional)</Label>
                <Input
                  type="password"
                  placeholder="Leave blank to keep current password"
                  value={editingUser.password}
                  onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                  className="mt-1 h-9 text-xs"
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsEditFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={submitting} className="bg-brand text-white font-semibold">
                  {submitting ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
