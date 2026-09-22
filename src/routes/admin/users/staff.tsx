import React, { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Users,
  PhoneCall,
  Calendar,
  CheckCircle2,
  XCircle,
  Search,
  RefreshCw,
  PlusCircle,
  Pencil,
  Eye,
  EyeOff,
  Briefcase,
  Award,
  DollarSign,
  TrendingUp,
  MapPin,
  Check,
  Phone,
  Lock,
  Mail,
  User,
  CreditCard,
  Fingerprint,
  GraduationCap,
  Building2,
  Wallet,
  Landmark,
  Hash,
  ArrowLeft,
  ArrowRight,
  FileText,
  Plus,
  Minus,
} from "lucide-react";
import {
  fetchAdminStaffReport,
  fetchAdminTeamLeaders,
  toggleUserActiveStatus,
  addStaffMemberUser,
  editStaffMemberUser,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

export const Route = createFileRoute("/admin/users/staff")({
  head: () => ({
    meta: [{ title: "Admin - Telecalling Staff | Vrindavan ERP" }],
  }),
  component: AdminStaffPage,
});

const kpiCards = [
  { title: "Total Leads", key: "total_leads", icon: Users, color: "text-rose-500", bg: "bg-rose-50 border-rose-200", link: "/admin/leads-report/total-leads" },
  { title: "Total Visit", key: "total_visits_leads", icon: Eye, color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-200", link: "/admin/leads-report/visit" },
  { title: "Interested", key: "total_interested_leads", icon: Check, color: "text-teal-500", bg: "bg-teal-50 border-teal-200", link: "/admin/leads-report/interested" },
  { title: "Not Interested", key: "total_not_interested_leads", icon: XCircle, color: "text-red-500", bg: "bg-red-50 border-red-200", link: "/admin/leads-report/not-interested" },
  { title: "Other Location", key: "total_other_location_leads", icon: MapPin, color: "text-amber-500", bg: "bg-amber-50 border-amber-200", link: "/admin/leads-report/other-location" },
  { title: "Not Picked", key: "total_not_picked_leads", icon: Phone, color: "text-purple-500", bg: "bg-purple-50 border-purple-200", link: "/admin/leads-report/not-picked" },
  { title: "Total Earning", key: "total_earning", icon: DollarSign, color: "text-yellow-600", bg: "bg-amber-50 border-amber-200", link: "/admin/users/staff/earn" },
];

const initialStaffFormData = {
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
  team_leader: "",
  admin: "",
};

export function AdminStaffPage() {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [teamLeaders, setTeamLeaders] = useState<any[]>([]);
  const [kpis, setKpis] = useState<Record<string, number>>({
    total_leads: 184,
    total_visits_leads: 42,
    total_interested_leads: 68,
    total_not_interested_leads: 31,
    total_other_location_leads: 22,
    total_not_picked_leads: 21,
    total_earning: 145000,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRowId, setExpandedRowId] = useState<number | string | null>(null);

  // Tabs for Add / Edit
  const [activeTab, setActiveTab] = useState<"personal" | "account">("personal");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialStaffFormData);

  const loadData = async () => {
    try {
      setLoading(true);
      const [staffRes, tlRes] = await Promise.all([
        fetchAdminStaffReport("all"),
        fetchAdminTeamLeaders(),
      ]);

      if (Array.isArray(staffRes)) setStaffList(staffRes);
      else if (staffRes?.staff_list) setStaffList(staffRes.staff_list);
      else if (staffRes?.results) setStaffList(staffRes.results);

      if (staffRes?.counts) {
        setKpis(staffRes.counts);
      }

      if (tlRes?.team_leaders) setTeamLeaders(tlRes.team_leaders);
      else if (Array.isArray(tlRes)) setTeamLeaders(tlRes);
      else if (tlRes?.results) setTeamLeaders(tlRes.results);
    } catch (e: any) {
      console.error(e);
      toast.error("Failed to load staff list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleStatus = async (id: number | string, currentStatus: boolean) => {
    try {
      await toggleUserActiveStatus(id, "staff", !currentStatus);
      toast.success("Staff status updated successfully!");
      setStaffList((prev) =>
        prev.map((s) => (s.id === id ? { ...s, is_active: !currentStatus } : s))
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to toggle status");
    }
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setActiveTab("personal");
    setShowPassword(false);
    setFormData({
      ...initialStaffFormData,
      team_leader: teamLeaders[0]?.id ? String(teamLeaders[0].id) : "",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (staff: any) => {
    setIsEditing(true);
    setActiveTab("personal");
    setShowPassword(false);
    setFormData({
      id: String(staff.id),
      name: staff.name || "",
      email: staff.email || "",
      password: "",
      mobile: staff.mobile || staff.phone || "",
      dob: staff.dob || "",
      address: staff.address || "",
      city: staff.city || "",
      state: staff.state || "Uttar Pradesh",
      pincode: staff.pincode || "",
      degree: staff.degree || "",
      pancard: staff.pancard || "",
      aadharCard: staff.aadharCard || "",
      bank_name: staff.bank_name || "",
      account_number: staff.account_number || "",
      ifsc_code: staff.ifsc_code || "",
      upi_id: staff.upi_id || "",
      salary: staff.salary || "",
      team_leader: staff.team_leader_id ? String(staff.team_leader_id) : staff.team_leader || "",
      admin: staff.admin || "",
    });
    setModalOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile) {
      toast.error("Please fill required fields (Name, Email, Mobile).");
      return;
    }
    if (!isEditing && !formData.password) {
      toast.error("Password is required for new staff member.");
      return;
    }
    setSubmitting(true);
    try {
      if (isEditing) {
        await editStaffMemberUser(formData.id, formData);
        toast.success("Staff details updated successfully!");
      } else {
        await addStaffMemberUser(formData);
        toast.success("New Telecaller Staff registered successfully!");
      }
      setModalOpen(false);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Operation failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredStaff = staffList.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.mobile?.includes(q) ||
      s.phone?.includes(q) ||
      s.team_leader?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Users className="size-6 text-brand" />
            Branch Telecallers &amp; Staff
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Manage telecallers, team leader allocations, performance incentives and daily call registers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/users/staff/incentives"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border rounded-lg hover:bg-gray-50 text-gray-700 bg-white"
          >
            <Award className="size-3.5 text-amber-500" />
            Incentives
          </Link>
          <Link
            to="/admin/users/staff/earn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border rounded-lg hover:bg-gray-50 text-gray-700 bg-white"
          >
            <DollarSign className="size-3.5 text-emerald-600" />
            Earnings
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            className="text-xs flex items-center gap-1.5"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={handleOpenAdd}
            className="text-xs font-semibold bg-brand hover:bg-brand-dark text-white flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="size-4" />
            Add Staff
          </Button>
        </div>
      </div>

      {/* KPI Cards With Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {kpiCards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="border rounded-2xl p-3 bg-white hover:shadow-md transition-all flex flex-col items-center justify-center text-center group border-gray-200/80"
          >
            <div className={`size-10 rounded-full flex items-center justify-center ${card.bg} mb-1.5 group-hover:scale-110 transition-transform`}>
              <card.icon className={`size-5 ${card.color}`} />
            </div>
            <span className="font-semibold text-gray-800 text-xs truncate max-w-full">
              {card.title}
            </span>
            <span className="text-xs font-bold text-gray-500 mt-0.5">
              {kpis[card.key] ?? 0}
            </span>
          </Link>
        ))}
      </div>

      {/* Search Bar */}
      <Card className="border rounded-xl bg-white shadow-xs">
        <CardContent className="p-3">
          <div className="relative max-w-md">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search staff by name, mobile, team leader..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Staff Table matching CrmAttendance2 */}
      <Card className="border rounded-2xl bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3.5 w-14">S.N.</th>
                <th className="px-4 py-3.5">Name</th>
                <th className="px-4 py-3.5 hidden md:table-cell">Admin</th>
                <th className="px-4 py-3.5 hidden md:table-cell">Team Leader</th>
                <th className="px-4 py-3.5 hidden md:table-cell">Mobile</th>
                <th className="px-4 py-3.5 hidden lg:table-cell">Created Date</th>
                <th className="px-4 py-3.5 hidden lg:table-cell">Leads Report</th>
                <th className="px-4 py-3.5 text-center hidden lg:table-cell">Active Status</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                    Loading staff members...
                  </td>
                </tr>
              ) : filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                    No matching staff members found.
                  </td>
                </tr>
              ) : (
                filteredStaff.map((staff, idx) => (
                  <React.Fragment key={staff.id || idx}>
                    <tr className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-600">
                        <div className="lg:hidden">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedRowId(expandedRowId === staff.id ? null : staff.id)
                            }
                            className="text-brand p-1"
                          >
                            {expandedRowId === staff.id ? (
                              <Minus className="size-3.5" />
                            ) : (
                              <Plus className="size-3.5" />
                            )}
                          </button>
                        </div>
                        <span className="hidden lg:inline">{idx + 1}.</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-gray-900 block">{staff.name}</span>
                        <span className="text-[11px] text-gray-500 font-mono">{staff.email}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                        {staff.admin?.name || staff.admin || "Admin Office"}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                          {staff.team_leader?.name || staff.team_leader || "Direct Staff"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 font-mono hidden md:table-cell">
                        {staff.mobile || staff.phone || "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">
                        {staff.created_date || staff.created_at || "—"}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <select
                          className="bg-white border border-gray-200 rounded px-2 py-1 text-xs text-gray-700 outline-none"
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
                      <td className="px-4 py-3 text-center hidden lg:table-cell">
                        <Switch
                          checked={staff.is_active ?? staff.user_active ?? true}
                          onCheckedChange={() =>
                            handleToggleStatus(staff.id, staff.is_active ?? staff.user_active ?? true)
                          }
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEdit(staff)}
                          className="h-8 px-2 text-brand hover:text-brand-dark"
                        >
                          <Pencil className="size-3.5 mr-1" />
                          Edit
                        </Button>
                      </td>
                    </tr>

                    {/* Mobile Expandable Row */}
                    {expandedRowId === staff.id && (
                      <tr className="lg:hidden bg-gray-50/70">
                        <td colSpan={9} className="p-4 space-y-2 text-xs border-b">
                          <div className="flex justify-between border-b pb-1.5">
                            <span className="text-gray-500 font-medium">Team Leader:</span>
                            <span className="font-semibold text-gray-800">
                              {staff.team_leader?.name || staff.team_leader || "Direct"}
                            </span>
                          </div>
                          <div className="flex justify-between border-b pb-1.5">
                            <span className="text-gray-500 font-medium">Mobile:</span>
                            <span className="font-mono text-gray-800">{staff.mobile || staff.phone || "—"}</span>
                          </div>
                          <div className="flex justify-between border-b pb-1.5">
                            <span className="text-gray-500 font-medium">Active Status:</span>
                            <Switch
                              checked={staff.is_active ?? staff.user_active ?? true}
                              onCheckedChange={() =>
                                handleToggleStatus(staff.id, staff.is_active ?? staff.user_active ?? true)
                              }
                            />
                          </div>
                          <div className="flex justify-end pt-1">
                            <Button size="sm" variant="outline" onClick={() => handleOpenEdit(staff)}>
                              <Pencil className="size-3 mr-1" /> Edit Staff
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Multi-Tab Add / Edit Staff Modal (Exact CrmAttendance2 Fields) */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-3xl w-[calc(100vw-2rem)] max-h-[90vh] p-0 rounded-2xl shadow-2xl flex flex-col bg-white">
          <DialogHeader className="p-6 pb-4 border-b flex-shrink-0">
            <DialogTitle className="text-xl font-bold text-gray-900">
              {isEditing ? `Edit Staff - ${formData.name}` : "Add New Telecaller Staff"}
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              Fill in personal identity and bank payroll details below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            {/* Top Team Leader Allocation */}
            <div className="px-6 pt-4 pb-2">
              <Label className="font-semibold text-gray-700 text-xs">Assign to Team Leader</Label>
              <select
                name="team_leader"
                value={formData.team_leader}
                onChange={handleFormChange}
                className="w-full mt-1 border rounded-md h-10 px-3 text-xs outline-none focus:border-brand bg-white"
              >
                <option value="">Select Team Leader</option>
                {teamLeaders.map((tl) => (
                  <option key={tl.id} value={tl.id}>
                    {tl.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tabs Header */}
            <div className="px-6 pt-2 flex border-b gap-4">
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
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
                        className="pl-9 h-10 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">
                      {isEditing ? "New Password (leave blank to keep)" : "Password *"}
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                        placeholder="B.A / B.Com / 12th"
                        value={formData.degree}
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
                        className="pl-9 h-10 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">State</Label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange}
                      className="w-full mt-1 border rounded-md h-10 px-3 text-xs outline-none focus:border-brand"
                    >
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Maharashtra">Maharashtra</option>
                    </select>
                  </div>

                  <div>
                    <Label className="font-semibold text-gray-700">Monthly Salary (₹)</Label>
                    <div className="relative mt-1">
                      <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <Input
                        name="salary"
                        placeholder="e.g. 25000"
                        value={formData.salary}
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                        placeholder="State Bank of India / HDFC"
                        value={formData.bank_name}
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
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
                        onChange={handleFormChange}
                        className="pl-9 h-10 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="font-semibold text-gray-700">Full Residential Address</Label>
                    <Textarea
                      name="address"
                      placeholder="Street, locality, landmark, city, state"
                      value={formData.address}
                      onChange={handleFormChange}
                      rows={3}
                      className="mt-1 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <DialogFooter className="p-4 border-t bg-gray-50 flex items-center justify-between sm:justify-between w-full flex-shrink-0">
              {activeTab === "account" ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("personal")}
                  className="text-xs"
                >
                  <ArrowLeft className="size-3.5 mr-1" />
                  Back: Personal Details
                </Button>
              ) : (
                <div />
              )}

              {activeTab === "personal" ? (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setActiveTab("account")}
                  className="text-xs font-semibold bg-brand hover:bg-brand-dark text-white"
                >
                  Next: Account Details
                  <ArrowRight className="size-3.5 ml-1" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={submitting}
                  size="sm"
                  className="text-xs font-semibold bg-brand hover:bg-brand-dark text-white"
                >
                  {submitting ? "Saving..." : isEditing ? "Save Changes" : "Create Staff"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminStaffPage;
