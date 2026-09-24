import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Briefcase,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Copy,
  Building2,
  Calendar,
  Lock,
  Phone,
  Mail,
  HeartPulse,
} from "lucide-react";
import { toast } from "sonner";

export interface NewEmployeeRecord {
  id: number | string;
  name: string;
  code: string;
  email: string;
  dept: string;
  role: string;
  mobile: string;
  status: string;
  joinDate: string;
  salary?: string;
  pan?: string;
  aadhaar?: string;
  bankAccount?: string;
  shift?: string;
}

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEmployeeAdded?: (employee: NewEmployeeRecord) => void;
  nextEmployeeId?: number;
}

export function AddEmployeeDialog({
  open,
  onOpenChange,
  onEmployeeAdded,
  nextEmployeeId = 107,
}: AddEmployeeDialogProps) {
  const [activeTab, setActiveTab] = useState<"personal" | "job" | "financial" | "emergency">("personal");

  // Form states
  const [personal, setPersonal] = useState({
    fullName: "",
    email: "",
    personalEmail: "",
    mobile: "",
    altMobile: "",
    dob: "",
    gender: "Male",
    maritalStatus: "Single",
    bloodGroup: "O+",
    currentAddress: "",
    permanentAddress: "",
    password: "",
    confirmPassword: "",
  });

  const [job, setJob] = useState({
    employeeCode: `EMP-${nextEmployeeId}`,
    department: "Sales",
    designation: "Telecaller Executive",
    employmentType: "Full-time Permanent",
    joiningDate: new Date().toISOString().split("T")[0],
    shift: "General Day Shift (09:30 AM - 06:30 PM)",
    reportingManager: "Sales Team Leader",
    workLocation: "Vrindavan Central Campus",
    noticePeriod: "30 Days",
  });

  const [financial, setFinancial] = useState({
    monthlyGross: "35000",
    basicSalary: "21000",
    hra: "8400",
    otherAllowances: "5600",
    bankName: "State Bank of India (SBI)",
    accountHolderName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "SBIN0001244",
    accountType: "Salary Account",
    panNumber: "",
    uanNumber: "",
    esicNumber: "",
  });

  const [emergency, setEmergency] = useState({
    aadhaarNumber: "",
    contactName: "",
    relation: "Father",
    contactPhone: "",
    contactAddress: "",
    secondaryName: "",
    secondaryRelation: "Mother",
    secondaryPhone: "",
    medicalNotes: "No known chronic illness or severe allergies.",
  });

  // Copy current address to permanent address
  const copyAddress = () => {
    if (!personal.currentAddress) {
      toast.warning("Please enter Current Address first.");
      return;
    }
    setPersonal((prev) => ({ ...prev, permanentAddress: prev.currentAddress }));
    toast.info("Permanent address copied from current address.");
  };

  const handleNextTab = (current: string) => {
    if (current === "personal") {
      if (!personal.fullName || !personal.email || !personal.mobile) {
        toast.error("Please fill Name, Official Email and Mobile Number.");
        return;
      }
      setActiveTab("job");
    } else if (current === "job") {
      if (!job.designation || !job.employeeCode) {
        toast.error("Please provide Employee Code and Designation.");
        return;
      }
      setActiveTab("financial");
    } else if (current === "financial") {
      setActiveTab("emergency");
    }
  };

  const handlePrevTab = (current: string) => {
    if (current === "emergency") setActiveTab("financial");
    else if (current === "financial") setActiveTab("job");
    else if (current === "job") setActiveTab("personal");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!personal.fullName.trim()) {
      toast.error("Employee Full Name is required.");
      setActiveTab("personal");
      return;
    }
    if (!personal.email.trim()) {
      toast.error("Official Email Address is required.");
      setActiveTab("personal");
      return;
    }
    if (!personal.mobile.trim()) {
      toast.error("Primary Mobile Number is required.");
      setActiveTab("personal");
      return;
    }

    if (personal.password && personal.password !== personal.confirmPassword) {
      toast.error("Passwords do not match.");
      setActiveTab("personal");
      return;
    }

    const createdRecord: NewEmployeeRecord = {
      id: Date.now(),
      name: personal.fullName,
      code: job.employeeCode || `EMP-${Date.now().toString().slice(-4)}`,
      email: personal.email,
      dept: job.department,
      role: job.designation,
      mobile: personal.mobile,
      status: "Active",
      joinDate: new Date(job.joiningDate || Date.now()).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      salary: `₹${Number(financial.monthlyGross || 0).toLocaleString("en-IN")}/mo`,
      pan: financial.panNumber || "Pending",
      aadhaar: emergency.aadhaarNumber || "Pending",
      bankAccount: financial.accountNumber ? `••••${financial.accountNumber.slice(-4)}` : "Pending",
      shift: job.shift,
    };

    if (onEmployeeAdded) {
      onEmployeeAdded(createdRecord);
    }

    toast.success(`Employee ${personal.fullName} (${job.employeeCode}) onboarded successfully!`);
    onOpenChange(false);

    // Reset form
    setPersonal({
      fullName: "",
      email: "",
      personalEmail: "",
      mobile: "",
      altMobile: "",
      dob: "",
      gender: "Male",
      maritalStatus: "Single",
      bloodGroup: "O+",
      currentAddress: "",
      permanentAddress: "",
      password: "",
      confirmPassword: "",
    });
    setFinancial({
      monthlyGross: "35000",
      basicSalary: "21000",
      hra: "8400",
      otherAllowances: "5600",
      bankName: "State Bank of India (SBI)",
      accountHolderName: "",
      accountNumber: "",
      confirmAccountNumber: "",
      ifscCode: "SBIN0001244",
      accountType: "Salary Account",
      panNumber: "",
      uanNumber: "",
      esicNumber: "",
    });
    setEmergency({
      aadhaarNumber: "",
      contactName: "",
      relation: "Father",
      contactPhone: "",
      contactAddress: "",
      secondaryName: "",
      secondaryRelation: "Mother",
      secondaryPhone: "",
      medicalNotes: "No known chronic illness or severe allergies.",
    });
    setActiveTab("personal");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[96vw] sm:max-w-4xl max-h-[92vh] p-0 rounded-xl shadow-2xl flex flex-col overflow-hidden bg-background border">
        {/* Header */}
        <DialogHeader className="p-4 sm:p-5 pb-3 border-b bg-muted/30 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                <User className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                  Add New Employee Master Record
                  <Badge variant="outline" className="text-[11px] font-mono text-primary bg-primary/5 border-primary/20">
                    {job.employeeCode}
                  </Badge>
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Complete official onboarding covering personal bio, job role, banking/salary, and emergency contacts.
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content Tabs */}
        <div className="flex-1 flex flex-col min-h-0 p-3 sm:p-5 overflow-y-auto">
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as any)}
            className="flex-1 flex flex-col min-h-0"
          >
            {/* Tab Navigation */}
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 h-auto p-1 bg-muted/60 rounded-lg flex-shrink-0">
              <TabsTrigger
                value="personal"
                className="text-xs py-2 gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-xs font-semibold"
              >
                <User className="h-3.5 w-3.5" />
                <span>1. Personal</span>
              </TabsTrigger>
              <TabsTrigger
                value="job"
                className="text-xs py-2 gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-xs font-semibold"
              >
                <Briefcase className="h-3.5 w-3.5" />
                <span>2. Job & Shift</span>
              </TabsTrigger>
              <TabsTrigger
                value="financial"
                className="text-xs py-2 gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-xs font-semibold"
              >
                <CreditCard className="h-3.5 w-3.5" />
                <span>3. Financial & Bank</span>
              </TabsTrigger>
              <TabsTrigger
                value="emergency"
                className="text-xs py-2 gap-1.5 data-[state=active]:bg-background data-[state=active]:shadow-xs font-semibold"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>4. Identity & Emergency</span>
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: PERSONAL DETAILS */}
            <TabsContent value="personal" className="mt-4 space-y-4 focus-visible:outline-none">
              <div className="bg-muted/20 border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground border-b pb-2">
                  <User className="h-4 w-4 text-primary" />
                  Primary Bio & Contact Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">
                      Full Name <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      placeholder="e.g. Rajesh Kumar Sharma"
                      value={personal.fullName}
                      onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                      className="h-8 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">
                      Official Work Email <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      placeholder="rajesh@vrindavan.com"
                      value={personal.email}
                      onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                      className="h-8 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Personal Email (Optional)</Label>
                    <Input
                      type="email"
                      placeholder="rajesh.personal@gmail.com"
                      value={personal.personalEmail}
                      onChange={(e) => setPersonal({ ...personal, personalEmail: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">
                      Mobile Number <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      placeholder="+91 98290 12345"
                      value={personal.mobile}
                      onChange={(e) => setPersonal({ ...personal, mobile: e.target.value })}
                      className="h-8 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Alternate / WhatsApp No.</Label>
                    <Input
                      placeholder="+91 98290 54321"
                      value={personal.altMobile}
                      onChange={(e) => setPersonal({ ...personal, altMobile: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Date of Birth (DOB)</Label>
                    <Input
                      type="date"
                      value={personal.dob}
                      onChange={(e) => setPersonal({ ...personal, dob: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Gender</Label>
                    <Select
                      value={personal.gender}
                      onValueChange={(val) => setPersonal({ ...personal, gender: val })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male" className="text-xs">Male</SelectItem>
                        <SelectItem value="Female" className="text-xs">Female</SelectItem>
                        <SelectItem value="Other" className="text-xs">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Marital Status</Label>
                    <Select
                      value={personal.maritalStatus}
                      onValueChange={(val) => setPersonal({ ...personal, maritalStatus: val })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single" className="text-xs">Single</SelectItem>
                        <SelectItem value="Married" className="text-xs">Married</SelectItem>
                        <SelectItem value="Divorced" className="text-xs">Divorced</SelectItem>
                        <SelectItem value="Widowed" className="text-xs">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Blood Group</Label>
                    <Select
                      value={personal.bloodGroup}
                      onValueChange={(val) => setPersonal({ ...personal, bloodGroup: val })}
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
                        <SelectItem value="AB-" className="text-xs">AB-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="bg-muted/20 border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Building2 className="h-4 w-4 text-primary" />
                    Residential Address
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={copyAddress}
                    className="h-6 text-[11px] gap-1 text-primary hover:text-primary font-medium"
                  >
                    <Copy className="h-3 w-3" />
                    Copy Current to Permanent
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Current Living Address</Label>
                    <Textarea
                      placeholder="Flat/House No., Street, Landmark, City, State, PIN code"
                      value={personal.currentAddress}
                      onChange={(e) => setPersonal({ ...personal, currentAddress: e.target.value })}
                      className="text-xs min-h-[64px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Permanent / Native Address</Label>
                    <Textarea
                      placeholder="Permanent village/home address as per Aadhaar record"
                      value={personal.permanentAddress}
                      onChange={(e) => setPersonal({ ...personal, permanentAddress: e.target.value })}
                      className="text-xs min-h-[64px]"
                    />
                  </div>
                </div>
              </div>

              {/* Login Credentials */}
              <div className="bg-muted/20 border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground border-b pb-2">
                  <Lock className="h-4 w-4 text-primary" />
                  ERP Portal Login Credentials
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Initial Login Password</Label>
                    <Input
                      type="password"
                      placeholder="Default: Welcome@2026"
                      value={personal.password}
                      onChange={(e) => setPersonal({ ...personal, password: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Confirm Password</Label>
                    <Input
                      type="password"
                      placeholder="Confirm initial password"
                      value={personal.confirmPassword}
                      onChange={(e) => setPersonal({ ...personal, confirmPassword: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: JOB & SHIFT DETAILS */}
            <TabsContent value="job" className="mt-4 space-y-4 focus-visible:outline-none">
              <div className="bg-muted/20 border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground border-b pb-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Organization & Department Assignment
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">
                      Employee ID / Code <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      value={job.employeeCode}
                      onChange={(e) => setJob({ ...job, employeeCode: e.target.value })}
                      className="h-8 text-xs font-mono font-semibold"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">
                      Department <span className="text-rose-500">*</span>
                    </Label>
                    <Select
                      value={job.department}
                      onValueChange={(val) => setJob({ ...job, department: val })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sales" className="text-xs">Sales & Real Estate</SelectItem>
                        <SelectItem value="Engineering" className="text-xs">Engineering & IT</SelectItem>
                        <SelectItem value="HR" className="text-xs">HR & People Operations</SelectItem>
                        <SelectItem value="Finance" className="text-xs">Finance & Accounts</SelectItem>
                        <SelectItem value="Design" className="text-xs">Creative & Marketing</SelectItem>
                        <SelectItem value="Operations" className="text-xs">Site & Campus Operations</SelectItem>
                        <SelectItem value="Telecalling" className="text-xs">Telecalling & Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">
                      Designation / Role Title <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      placeholder="e.g. Telecaller Executive"
                      value={job.designation}
                      onChange={(e) => setJob({ ...job, designation: e.target.value })}
                      className="h-8 text-xs"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Employment Type</Label>
                    <Select
                      value={job.employmentType}
                      onValueChange={(val) => setJob({ ...job, employmentType: val })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time Permanent" className="text-xs">Full-time Permanent</SelectItem>
                        <SelectItem value="Probation (3 Months)" className="text-xs">Probation (3 Months)</SelectItem>
                        <SelectItem value="Probation (6 Months)" className="text-xs">Probation (6 Months)</SelectItem>
                        <SelectItem value="Contractual" className="text-xs">Contractual</SelectItem>
                        <SelectItem value="Part-time" className="text-xs">Part-time</SelectItem>
                        <SelectItem value="Intern" className="text-xs">Intern / Trainee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">
                      Date of Joining (DOJ) <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      type="date"
                      value={job.joiningDate}
                      onChange={(e) => setJob({ ...job, joiningDate: e.target.value })}
                      className="h-8 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Work Location / Branch</Label>
                    <Select
                      value={job.workLocation}
                      onValueChange={(val) => setJob({ ...job, workLocation: val })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Vrindavan Central Campus" className="text-xs">Vrindavan Central Campus</SelectItem>
                        <SelectItem value="Mathura Head Office" className="text-xs">Mathura Head Office</SelectItem>
                        <SelectItem value="Delhi NCR Project Site" className="text-xs">Delhi NCR Project Site</SelectItem>
                        <SelectItem value="Jaipur Regional Branch" className="text-xs">Jaipur Regional Branch</SelectItem>
                        <SelectItem value="Remote / Hybrid" className="text-xs">Remote / Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Assigned Work Shift</Label>
                    <Select
                      value={job.shift}
                      onValueChange={(val) => setJob({ ...job, shift: val })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Day Shift (09:30 AM - 06:30 PM)" className="text-xs">
                          General Day (09:30 AM - 06:30 PM)
                        </SelectItem>
                        <SelectItem value="Morning Shift (08:00 AM - 04:30 PM)" className="text-xs">
                          Morning (08:00 AM - 04:30 PM)
                        </SelectItem>
                        <SelectItem value="Evening Shift (01:00 PM - 09:30 PM)" className="text-xs">
                          Evening (01:00 PM - 09:30 PM)
                        </SelectItem>
                        <SelectItem value="Night Shift (09:30 PM - 06:00 AM)" className="text-xs">
                          Night (09:30 PM - 06:00 AM)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Reporting Manager</Label>
                    <Input
                      placeholder="e.g. Sales Team Leader"
                      value={job.reportingManager}
                      onChange={(e) => setJob({ ...job, reportingManager: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Notice Period</Label>
                    <Select
                      value={job.noticePeriod}
                      onValueChange={(val) => setJob({ ...job, noticePeriod: val })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Immediate" className="text-xs">Immediate</SelectItem>
                        <SelectItem value="15 Days" className="text-xs">15 Days</SelectItem>
                        <SelectItem value="30 Days" className="text-xs">30 Days</SelectItem>
                        <SelectItem value="60 Days" className="text-xs">60 Days</SelectItem>
                        <SelectItem value="90 Days" className="text-xs">90 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: FINANCIAL & BANKING DETAILS */}
            <TabsContent value="financial" className="mt-4 space-y-4 focus-visible:outline-none">
              <div className="bg-muted/20 border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground border-b pb-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Salary Structure & Compensation (INR ₹)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">
                      Monthly CTC / Gross (₹) <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      type="number"
                      placeholder="35000"
                      value={financial.monthlyGross}
                      onChange={(e) => {
                        const gross = Number(e.target.value) || 0;
                        const basic = Math.round(gross * 0.6);
                        const hra = Math.round(gross * 0.24);
                        const other = gross - basic - hra;
                        setFinancial({
                          ...financial,
                          monthlyGross: e.target.value,
                          basicSalary: String(basic),
                          hra: String(hra),
                          otherAllowances: String(other),
                        });
                      }}
                      className="h-8 text-xs font-semibold text-primary"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Basic Salary (₹)</Label>
                    <Input
                      type="number"
                      value={financial.basicSalary}
                      onChange={(e) => setFinancial({ ...financial, basicSalary: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">HRA (₹)</Label>
                    <Input
                      type="number"
                      value={financial.hra}
                      onChange={(e) => setFinancial({ ...financial, hra: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Other Allowances (₹)</Label>
                    <Input
                      type="number"
                      value={financial.otherAllowances}
                      onChange={(e) => setFinancial({ ...financial, otherAllowances: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Account Details */}
              <div className="bg-muted/20 border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground border-b pb-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Bank Disbursement Account Details
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Bank Name</Label>
                    <Select
                      value={financial.bankName}
                      onValueChange={(val) => setFinancial({ ...financial, bankName: val })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="State Bank of India (SBI)" className="text-xs">State Bank of India (SBI)</SelectItem>
                        <SelectItem value="HDFC Bank" className="text-xs">HDFC Bank</SelectItem>
                        <SelectItem value="ICICI Bank" className="text-xs">ICICI Bank</SelectItem>
                        <SelectItem value="Punjab National Bank (PNB)" className="text-xs">Punjab National Bank (PNB)</SelectItem>
                        <SelectItem value="Axis Bank" className="text-xs">Axis Bank</SelectItem>
                        <SelectItem value="Bank of Baroda" className="text-xs">Bank of Baroda</SelectItem>
                        <SelectItem value="Kotak Mahindra Bank" className="text-xs">Kotak Mahindra Bank</SelectItem>
                        <SelectItem value="Canara Bank" className="text-xs">Canara Bank</SelectItem>
                        <SelectItem value="Other Bank" className="text-xs">Other Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Account Holder Name</Label>
                    <Input
                      placeholder="Name as per Bank Passbook"
                      value={financial.accountHolderName || personal.fullName}
                      onChange={(e) => setFinancial({ ...financial, accountHolderName: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Account Type</Label>
                    <Select
                      value={financial.accountType}
                      onValueChange={(val) => setFinancial({ ...financial, accountType: val })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Salary Account" className="text-xs">Salary Account</SelectItem>
                        <SelectItem value="Savings Account" className="text-xs">Savings Account</SelectItem>
                        <SelectItem value="Current Account" className="text-xs">Current Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Bank Account Number</Label>
                    <Input
                      type="password"
                      placeholder="e.g. 50100234567891"
                      value={financial.accountNumber}
                      onChange={(e) => setFinancial({ ...financial, accountNumber: e.target.value })}
                      className="h-8 text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Confirm Account Number</Label>
                    <Input
                      placeholder="Re-enter account number"
                      value={financial.confirmAccountNumber}
                      onChange={(e) => setFinancial({ ...financial, confirmAccountNumber: e.target.value })}
                      className="h-8 text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">IFSC Code (11 Digits)</Label>
                    <Input
                      placeholder="e.g. SBIN0001244"
                      value={financial.ifscCode}
                      onChange={(e) => setFinancial({ ...financial, ifscCode: e.target.value.toUpperCase() })}
                      className="h-8 text-xs uppercase font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Tax & Statutory Identifiers */}
              <div className="bg-muted/20 border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground border-b pb-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Taxation & Statutory Identifiers (PF, ESIC, PAN)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">PAN Card Number</Label>
                    <Input
                      placeholder="e.g. ABCDE1234F"
                      value={financial.panNumber}
                      onChange={(e) => setFinancial({ ...financial, panNumber: e.target.value.toUpperCase() })}
                      className="h-8 text-xs uppercase font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">UAN / EPF Number (12 Digits)</Label>
                    <Input
                      placeholder="e.g. 100987654321"
                      value={financial.uanNumber}
                      onChange={(e) => setFinancial({ ...financial, uanNumber: e.target.value })}
                      className="h-8 text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">ESIC Number (Optional)</Label>
                    <Input
                      placeholder="e.g. 31000123450000001"
                      value={financial.esicNumber}
                      onChange={(e) => setFinancial({ ...financial, esicNumber: e.target.value })}
                      className="h-8 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* TAB 4: IDENTITY & EMERGENCY CONTACTS */}
            <TabsContent value="emergency" className="mt-4 space-y-4 focus-visible:outline-none">
              <div className="bg-muted/20 border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground border-b pb-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Government Identity Verification
                </div>

                <div className="space-y-1 max-w-sm">
                  <Label className="text-xs font-medium">
                    Aadhaar Card Number (12 Digits UID) <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    placeholder="XXXX XXXX XXXX"
                    value={emergency.aadhaarNumber}
                    onChange={(e) => setEmergency({ ...emergency, aadhaarNumber: e.target.value })}
                    className="h-8 text-xs font-mono"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Required for biometric biometric attendance verification and statutory filings.
                  </p>
                </div>
              </div>

              {/* Primary Emergency Contact */}
              <div className="bg-muted/20 border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground border-b pb-2">
                  <Phone className="h-4 w-4 text-primary" />
                  Primary Emergency Contact Person
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Contact Person Name</Label>
                    <Input
                      placeholder="e.g. Suresh Kumar Sharma"
                      value={emergency.contactName}
                      onChange={(e) => setEmergency({ ...emergency, contactName: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Relationship</Label>
                    <Select
                      value={emergency.relation}
                      onValueChange={(val) => setEmergency({ ...emergency, relation: val })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Father" className="text-xs">Father</SelectItem>
                        <SelectItem value="Mother" className="text-xs">Mother</SelectItem>
                        <SelectItem value="Spouse" className="text-xs">Spouse</SelectItem>
                        <SelectItem value="Brother" className="text-xs">Brother</SelectItem>
                        <SelectItem value="Sister" className="text-xs">Sister</SelectItem>
                        <SelectItem value="Guardian" className="text-xs">Guardian</SelectItem>
                        <SelectItem value="Friend" className="text-xs">Friend / Relative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Emergency Mobile No.</Label>
                    <Input
                      placeholder="+91 98290 88990"
                      value={emergency.contactPhone}
                      onChange={(e) => setEmergency({ ...emergency, contactPhone: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium">Emergency Contact Residence Address</Label>
                  <Input
                    placeholder="City / Village / Home address of relative"
                    value={emergency.contactAddress}
                    onChange={(e) => setEmergency({ ...emergency, contactAddress: e.target.value })}
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              {/* Secondary Emergency Contact & Medical */}
              <div className="bg-muted/20 border rounded-lg p-3 sm:p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground border-b pb-2">
                  <HeartPulse className="h-4 w-4 text-primary" />
                  Secondary Relative & Medical Information
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Secondary Relative Name</Label>
                    <Input
                      placeholder="e.g. Suman Sharma"
                      value={emergency.secondaryName}
                      onChange={(e) => setEmergency({ ...emergency, secondaryName: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Relationship</Label>
                    <Select
                      value={emergency.secondaryRelation}
                      onValueChange={(val) => setEmergency({ ...emergency, secondaryRelation: val })}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mother" className="text-xs">Mother</SelectItem>
                        <SelectItem value="Father" className="text-xs">Father</SelectItem>
                        <SelectItem value="Spouse" className="text-xs">Spouse</SelectItem>
                        <SelectItem value="Sibling" className="text-xs">Sibling</SelectItem>
                        <SelectItem value="Other" className="text-xs">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-medium">Secondary Phone</Label>
                    <Input
                      placeholder="+91 98290 77665"
                      value={emergency.secondaryPhone}
                      onChange={(e) => setEmergency({ ...emergency, secondaryPhone: e.target.value })}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium">Medical Notes / Critical Allergies (Optional)</Label>
                  <Input
                    placeholder="e.g. Penicillin allergy, diabetic, etc."
                    value={emergency.medicalNotes}
                    onChange={(e) => setEmergency({ ...emergency, medicalNotes: e.target.value })}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer with Step Controls */}
        <DialogFooter className="p-3 sm:p-4 border-t bg-muted/40 gap-2 flex flex-row items-center justify-between w-full flex-shrink-0">
          <div>
            {activeTab !== "personal" && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handlePrevTab(activeTab)}
                className="h-8 text-xs gap-1"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous Step
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 text-xs"
            >
              Cancel
            </Button>

            {activeTab !== "emergency" ? (
              <Button
                type="button"
                size="sm"
                onClick={() => handleNextTab(activeTab)}
                className="h-8 text-xs gap-1 font-semibold"
              >
                Next Step
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                onClick={handleSubmit}
                className="h-8 text-xs gap-1.5 font-bold bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
              >
                <CheckCircle2 className="h-4 w-4" />
                Save & Onboard Employee
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
