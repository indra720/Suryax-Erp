import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import {
  Users,
  Eye,
  CheckCircle,
  XCircle,
  MapPin,
  PhoneOff,
  Calendar,
  Search,
  PlusCircle,
  LogIn,
  LogOut,
  UserCheck,
  FileUp,
  Percent,
  Pencil,
  Mail,
  Lock,
  Filter,
  ArrowLeft,
  Briefcase,
  User,
  CreditCard,
  Fingerprint,
  GraduationCap,
  Landmark,
  Hash,
  Wallet,
  Building2,
  ArrowRight,
  Phone,
  Minus,
  Plus,
  RotateCw,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  fetchTeamLeaderStaffDashboard,
  addTeamLeaderStaff,
  editTeamLeaderStaff,
  TeamLeaderStaff,
} from "@/lib/services/team-leader";

export const Route = createFileRoute("/team-leader/")({
  head: () => ({
    meta: [
      { title: "Team Leader Dashboard | Vrindavan ERP" },
      { name: "description", content: "Team leader staff monitoring and lead KPIs." },
    ],
  }),
  component: TeamLeaderDashboardPage,
});

const initialFormData = {
  id: null,
  name: "",
  email: "",
  password: "",
  mobile: "",
  dob: "",
  address: "",
  city: "",
  state: "Rajasthan",
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

export function TeamLeaderDashboardPage() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [formData, setFormData] = useState<any>(initialFormData);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [users, setUsers] = useState<TeamLeaderStaff[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const loadData = async (start?: string, end?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTeamLeaderStaffDashboard(start, end);
      setDashboardData(data);
      const formattedUsers = (data.staff_list || []).map((staff: any) => ({
        ...staff,
        name: staff.username || staff.name,
        createdDate: staff.created_date
          ? new Date(staff.created_date)
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
              .replace(/ /g, "-")
          : "N/A",
      }));
      setUsers(formattedUsers);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data");
      toast.error(err.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFilter = () => {
    loadData(startDate || undefined, endDate || undefined);
  };

  const handleRefresh = () => {
    setStartDate("");
    setEndDate("");
    loadData();
  };

  const toggleRow = (rowId: number) => {
    setExpandedRowId(expandedRowId === rowId ? null : rowId);
  };

  const filteredStaff = users.filter(
    (staff) =>
      (staff.name && staff.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (staff.email && staff.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (staff.mobile && staff.mobile.includes(searchQuery))
  );

  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFormSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenAddForm = () => {
    setFormData(initialFormData);
    setActiveTab("personal");
    setIsAddFormOpen(true);
    setShowPassword(false);
  };

  const handleOpenEditForm = (userItem: any) => {
    setEditingUser({ ...userItem, name: userItem.username || userItem.name });
    setActiveTab("personal");
    setIsEditFormOpen(true);
    setShowPassword(false);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Email and password are required.");
      return;
    }
    setIsSubmitting(true);
    try {
      const data = new FormData();
      for (const key in formData) {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      }
      await addTeamLeaderStaff(data);
      toast.success(`${formData.name || "Staff"} has been added successfully.`);
      setIsAddFormOpen(false);
      setFormData(initialFormData);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to add staff.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser?.id) return;
    setIsSubmitting(true);
    try {
      const data = new FormData();
      for (const key in editingUser) {
        if (editingUser[key] !== null && editingUser[key] !== undefined) {
          data.append(key, editingUser[key]);
        }
      }
      await editTeamLeaderStaff(editingUser.id, data);
      toast.success(`${editingUser.name || "Staff"} has been updated successfully.`);
      setIsEditFormOpen(false);
      setEditingUser(null);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to update staff.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const counts = dashboardData?.counts || {};

  const kpiData = [
    {
      title: "Total Staff",
      value: counts.total_staff ?? 0,
      icon: Users,
      color: "text-blue-500",
      link: "/team-leader/productivity/staff",
    },
    {
      title: "Login Staff",
      value: counts.logged_in_count ?? 0,
      icon: LogIn,
      color: "text-emerald-500",
    },
    {
      title: "Log-out",
      value: counts.logged_out_count ?? 0,
      icon: LogOut,
      color: "text-rose-500",
    },
    {
      title: "Associate staff",
      value: counts.associate_staff ?? 0,
      icon: UserCheck,
      color: "text-purple-500",
      link: "/team-leader/productivity/associates",
    },
    {
      title: "Total Upload Lead",
      value: counts.total_upload_leads ?? 0,
      icon: FileUp,
      color: "text-sky-500",
      link: "/team-leader/leads",
    },
    {
      title: "Lost Leads",
      value: counts.lost_leads ?? 0,
      icon: Percent,
      color: "text-gray-500",
      link: "/team-leader/reports/lost-leads",
    },
    {
      title: "Total Lead",
      value: counts.total_leads ?? 0,
      icon: Users,
      color: "text-rose-500",
      link: "/team-leader/reports/total-leads",
    },
    {
      title: "Total Visits",
      value: counts.visits_leads ?? 0,
      icon: Eye,
      color: "text-green-500",
      link: "/team-leader/reports/visit",
    },
    {
      title: "Interested",
      value: counts.total_interested_leads ?? 0,
      icon: CheckCircle,
      color: "text-teal-500",
      link: "/team-leader/reports/interested",
    },
    {
      title: "Not Interested",
      value: counts.total_not_interested_leads ?? 0,
      icon: XCircle,
      color: "text-red-500",
      link: "/team-leader/reports/not-interested",
    },
    {
      title: "Other Location",
      value: counts.other_location_leads ?? 0,
      icon: MapPin,
      color: "text-orange-500",
      link: "/team-leader/reports/other-location",
    },
    {
      title: "Not Picked",
      value: counts.not_picked_leads ?? 0,
      icon: PhoneOff,
      color: "text-slate-500",
      link: "/team-leader/reports/not-picked",
    },
  ];

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Users className="size-6 text-[#6732F2]" />
            Team Leader Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Monitor telecalling team performance, daily calling queues, and staff conversion metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleOpenAddForm}
            className="bg-gradient-to-r from-[#331fa3] to-[#6732F2] hover:opacity-95 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircle className="size-4" />
            Add New Staff
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {kpiData.map((item, index) => {
          const content = (
            <Card
              key={index}
              className="border rounded-xl bg-white shadow-xs hover:shadow-md transition-shadow duration-200 cursor-pointer p-3 flex flex-col items-center justify-center text-center gap-1 group"
            >
              <div className={cn("p-2 rounded-lg bg-gray-50 group-hover:scale-110 transition-transform", item.color)}>
                <item.icon className="size-5" />
              </div>
              <p className="text-[11px] font-semibold text-gray-500 truncate w-full">{item.title}</p>
              <p className="text-lg font-bold text-gray-900">{item.value.toLocaleString()}</p>
            </Card>
          );

          if (item.link) {
            return (
              <Link key={index} to={item.link} className="block">
                {content}
              </Link>
            );
          }
          return <div key={index}>{content}</div>;
        })}
      </div>

      {/* Date Filter Bar */}
      <Card className="border rounded-xl bg-white shadow-xs">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="space-y-1 flex-1">
              <Label className="text-xs font-semibold text-gray-600">Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1 flex-1">
              <Label className="text-xs font-semibold text-gray-600">End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleFilter}
                disabled={loading}
                size="sm"
                className="h-9 text-xs bg-[#6732F2] hover:bg-[#5524cf] text-white font-medium flex items-center gap-1.5"
              >
                <Filter className="size-3.5" />
                Filter
              </Button>
              <Button
                onClick={handleRefresh}
                disabled={loading}
                variant="outline"
                size="sm"
                className="h-9 text-xs flex items-center gap-1.5"
              >
                <RotateCw className={cn("size-3.5", loading && "animate-spin")} />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Management Table */}
      <Card className="border rounded-xl bg-white shadow-xs overflow-hidden">
        <CardHeader className="p-3 sm:p-4 pb-2 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-sm sm:text-base font-bold text-gray-900">Staff Telecallers List</CardTitle>
            <CardDescription className="text-xs text-gray-500">
              Manage telecallers assigned to your team and inspect calling metrics.
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
            <Input
              placeholder="Search by name, email, mobile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 text-[11px] font-semibold text-gray-600 uppercase">
                  <TableHead className="w-12 text-center">S.N.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Mobile</TableHead>
                  <TableHead className="hidden lg:table-cell">Created Date</TableHead>
                  <TableHead className="hidden lg:table-cell">Duration</TableHead>
                  <TableHead className="hidden lg:table-cell text-center">Leads</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={8} className="py-4 text-center">
                        <div className="h-6 bg-gray-100 animate-pulse rounded-md" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredStaff.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-28 text-center text-xs text-gray-500">
                      No staff members found matching criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStaff.map((staff, index) => (
                    <React.Fragment key={staff.id}>
                      <TableRow className="text-xs hover:bg-gray-50/70">
                        <TableCell className="text-center font-medium">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              type="button"
                              onClick={() => toggleRow(staff.id)}
                              className="lg:hidden p-1 text-gray-500 hover:text-gray-900"
                            >
                              {expandedRowId === staff.id ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                            </button>
                            <span>{index + 1}.</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-gray-900">
                          {staff.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-gray-600">
                          {staff.email}
                        </TableCell>
                        <TableCell className="hidden md:table-cell font-mono text-gray-600">
                          {staff.mobile}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-gray-500">
                          {staff.createdDate}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-gray-500">
                          {staff.duration || "N/A"}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-center">
                          <Link to="/team-leader/leads/staff" search={{ id: String(staff.id) }}>
                            <Button variant="link" size="sm" className="h-auto p-0 text-xs font-semibold text-emerald-600">
                              View Leads
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleOpenEditForm(staff)}
                            className="size-7"
                          >
                            <Pencil className="size-3.5 text-gray-600" />
                          </Button>
                        </TableCell>
                      </TableRow>

                      {/* Expandable Accordion on Mobile / Tablet */}
                      {expandedRowId === staff.id && (
                        <TableRow className="lg:hidden bg-purple-50/30">
                          <TableCell colSpan={8} className="p-3">
                            <div className="grid grid-cols-2 gap-2 text-xs border rounded-lg p-2.5 bg-white">
                              <div>
                                <span className="font-semibold text-gray-500">Email:</span>{" "}
                                <span className="text-gray-900 break-all">{staff.email}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-500">Mobile:</span>{" "}
                                <span className="text-gray-900">{staff.mobile}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-500">Created:</span>{" "}
                                <span className="text-gray-900">{staff.createdDate}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-gray-500">City / State:</span>{" "}
                                <span className="text-gray-900">{staff.city || "Jaipur"}, {staff.state || "Rajasthan"}</span>
                              </div>
                              <div className="col-span-2 pt-2 flex items-center justify-between border-t mt-1">
                                <Link to="/team-leader/leads/staff" search={{ id: String(staff.id) }}>
                                  <Button variant="link" size="sm" className="p-0 text-emerald-600 text-xs font-semibold">
                                    View Calling Leads
                                  </Button>
                                </Link>
                                <Link to="/team-leader/incentives">
                                  <Button variant="link" size="sm" className="p-0 text-amber-600 text-xs font-semibold">
                                    Incentives
                                  </Button>
                                </Link>
                                <Link to="/team-leader/earn">
                                  <Button variant="link" size="sm" className="p-0 text-blue-600 text-xs font-semibold">
                                    Earn Calendar
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add New Staff Dialog */}
      <Dialog open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 overflow-hidden flex flex-col rounded-2xl">
          <DialogHeader className="p-4 sm:p-5 border-b bg-gray-50/50">
            <DialogTitle className="text-base sm:text-lg font-bold">Add New Staff Telecaller</DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              Provide personal, banking, and address credentials to onboard new staff.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddSubmit} className="flex-1 overflow-y-auto flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <div className="px-4 sm:px-5 pt-3 border-b">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="personal" className="text-xs">Personal Details</TabsTrigger>
                  <TabsTrigger value="account" className="text-xs">Account Details</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-4 sm:p-5 space-y-4 flex-1">
                {activeTab === "personal" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">Full Name *</Label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleAddFormChange}
                        placeholder="e.g. Ramesh Sharma"
                        className="h-9 text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">Email Address *</Label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleAddFormChange}
                        placeholder="ramesh@vrindavan.com"
                        className="h-9 text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1 relative">
                      <Label className="text-xs font-medium">Password *</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleAddFormChange}
                          placeholder="••••••••"
                          className="h-9 text-xs pr-8"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">Mobile Number *</Label>
                      <Input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleAddFormChange}
                        placeholder="9829012345"
                        className="h-9 text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">Date of Birth</Label>
                      <Input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleAddFormChange}
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">Monthly Salary (₹)</Label>
                      <Input
                        name="salary"
                        value={formData.salary}
                        onChange={handleAddFormChange}
                        placeholder="e.g. 25000"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">PAN Card Number</Label>
                      <Input
                        name="pancard"
                        value={formData.pancard}
                        onChange={handleAddFormChange}
                        placeholder="ABCDE1234F"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">Aadhar Card Number</Label>
                      <Input
                        name="aadharCard"
                        value={formData.aadharCard}
                        onChange={handleAddFormChange}
                        placeholder="1234 5678 9012"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">Degree / Qualification</Label>
                      <Input
                        name="degree"
                        value={formData.degree}
                        onChange={handleAddFormChange}
                        placeholder="e.g. Graduate, B.A."
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">City</Label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleAddFormChange}
                        placeholder="e.g. Jaipur"
                        className="h-9 text-xs"
                      />
                    </div>
                  </div>
                )}

                {activeTab === "account" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">Bank Name</Label>
                      <Input
                        name="bank_name"
                        value={formData.bank_name}
                        onChange={handleAddFormChange}
                        placeholder="State Bank of India"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">Account Number</Label>
                      <Input
                        name="account_number"
                        value={formData.account_number}
                        onChange={handleAddFormChange}
                        placeholder="0000123456789"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">IFSC Code</Label>
                      <Input
                        name="ifsc_code"
                        value={formData.ifsc_code}
                        onChange={handleAddFormChange}
                        placeholder="SBIN0001234"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">UPI ID</Label>
                      <Input
                        name="upi_id"
                        value={formData.upi_id}
                        onChange={handleAddFormChange}
                        placeholder="user@upi"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">State</Label>
                      <Select
                        value={formData.state}
                        onValueChange={(val) => handleAddFormSelectChange("state", val)}
                      >
                        <SelectTrigger className="h-9 text-xs">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                          <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="Gujarat">Gujarat</SelectItem>
                          <SelectItem value="Delhi">Delhi</SelectItem>
                          <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium">Pincode</Label>
                      <Input
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleAddFormChange}
                        placeholder="302001"
                        className="h-9 text-xs"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2 space-y-1">
                      <Label className="text-xs font-medium">Address</Label>
                      <Textarea
                        name="address"
                        value={formData.address}
                        onChange={handleAddFormChange}
                        placeholder="Enter full address"
                        className="min-h-[70px] text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="p-3 sm:p-4 border-t bg-gray-50/50 flex flex-row items-center justify-between gap-2">
                {activeTab === "personal" ? (
                  <div />
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("personal")}
                    className="text-xs flex items-center gap-1"
                  >
                    <ArrowLeft className="size-3.5" /> Previous
                  </Button>
                )}

                {activeTab === "personal" ? (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setActiveTab("account")}
                    className="text-xs bg-[#6732F2] hover:bg-[#5524cf] text-white flex items-center gap-1"
                  >
                    Next <ArrowRight className="size-3.5" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isSubmitting}
                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  >
                    {isSubmitting ? "Saving..." : "Save Staff"}
                  </Button>
                )}
              </DialogFooter>
            </Tabs>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Staff Dialog */}
      {editingUser && (
        <Dialog open={isEditFormOpen} onOpenChange={setIsEditFormOpen}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 overflow-hidden flex flex-col rounded-2xl">
            <DialogHeader className="p-4 sm:p-5 border-b bg-gray-50/50">
              <DialogTitle className="text-base sm:text-lg font-bold">
                Edit Staff: {editingUser.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Update account and personal information for this telecaller.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleEditSubmit} className="flex-1 overflow-y-auto flex flex-col">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <div className="px-4 sm:px-5 pt-3 border-b">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="personal" className="text-xs">Personal Details</TabsTrigger>
                    <TabsTrigger value="account" className="text-xs">Account Details</TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-4 sm:p-5 space-y-4 flex-1">
                  {activeTab === "personal" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Full Name</Label>
                        <Input
                          name="name"
                          value={editingUser.name || ""}
                          onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                          className="h-9 text-xs"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Email Address</Label>
                        <Input
                          type="email"
                          name="email"
                          value={editingUser.email || ""}
                          onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                          className="h-9 text-xs"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Mobile Number</Label>
                        <Input
                          type="tel"
                          name="mobile"
                          value={editingUser.mobile || ""}
                          onChange={(e) => setEditingUser({ ...editingUser, mobile: e.target.value })}
                          className="h-9 text-xs"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Monthly Salary</Label>
                        <Input
                          name="salary"
                          value={editingUser.salary || ""}
                          onChange={(e) => setEditingUser({ ...editingUser, salary: e.target.value })}
                          className="h-9 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">City</Label>
                        <Input
                          name="city"
                          value={editingUser.city || ""}
                          onChange={(e) => setEditingUser({ ...editingUser, city: e.target.value })}
                          className="h-9 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">State</Label>
                        <Input
                          name="state"
                          value={editingUser.state || ""}
                          onChange={(e) => setEditingUser({ ...editingUser, state: e.target.value })}
                          className="h-9 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === "account" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Bank Name</Label>
                        <Input
                          name="bank_name"
                          value={editingUser.bank_name || ""}
                          onChange={(e) => setEditingUser({ ...editingUser, bank_name: e.target.value })}
                          className="h-9 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">Account Number</Label>
                        <Input
                          name="account_number"
                          value={editingUser.account_number || ""}
                          onChange={(e) => setEditingUser({ ...editingUser, account_number: e.target.value })}
                          className="h-9 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">IFSC Code</Label>
                        <Input
                          name="ifsc_code"
                          value={editingUser.ifsc_code || ""}
                          onChange={(e) => setEditingUser({ ...editingUser, ifsc_code: e.target.value })}
                          className="h-9 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-medium">UPI ID</Label>
                        <Input
                          name="upi_id"
                          value={editingUser.upi_id || ""}
                          onChange={(e) => setEditingUser({ ...editingUser, upi_id: e.target.value })}
                          className="h-9 text-xs"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2 space-y-1">
                        <Label className="text-xs font-medium">Address</Label>
                        <Textarea
                          name="address"
                          value={editingUser.address || ""}
                          onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                          className="min-h-[70px] text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <DialogFooter className="p-3 sm:p-4 border-t bg-gray-50/50 flex flex-row items-center justify-between gap-2">
                  {activeTab === "personal" ? (
                    <div />
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("personal")}
                      className="text-xs"
                    >
                      <ArrowLeft className="size-3.5 mr-1" /> Previous
                    </Button>
                  )}
                  {activeTab === "personal" ? (
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => setActiveTab("account")}
                      className="text-xs bg-[#6732F2] hover:bg-[#5524cf] text-white"
                    >
                      Next <ArrowRight className="size-3.5 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isSubmitting}
                      className="text-xs bg-[#6732F2] hover:bg-[#5524cf] text-white font-semibold"
                    >
                      {isSubmitting ? "Updating..." : "Save Changes"}
                    </Button>
                  )}
                </DialogFooter>
              </Tabs>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
