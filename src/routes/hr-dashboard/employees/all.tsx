import React, { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Plus,
  User,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  Users,
  CheckCircle,
  Building,
  CreditCard,
  ShieldCheck,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  IndianRupee,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddEmployeeDialog, NewEmployeeRecord } from "@/components/forms/AddEmployeeDialog";
import { toast } from "sonner";

export const Route = createFileRoute("/hr-dashboard/employees/all")({
  head: () => ({
    meta: [{ title: "All Employees Directory | HR Dashboard" }],
  }),
  component: HrAllEmployeesPage,
});

interface EmployeeDetail extends NewEmployeeRecord {
  personalEmail?: string;
  altMobile?: string;
  dob?: string;
  gender?: string;
  maritalStatus?: string;
  bloodGroup?: string;
  currentAddress?: string;
  permanentAddress?: string;
  employmentType?: string;
  reportingManager?: string;
  workLocation?: string;
  basicSalary?: string;
  hra?: string;
  otherAllowances?: string;
  bankName?: string;
  accountHolderName?: string;
  ifscCode?: string;
  accountType?: string;
  uanNumber?: string;
  emergencyContactName?: string;
  emergencyRelation?: string;
  emergencyPhone?: string;
}

function HrAllEmployeesPage() {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeDetail | null>(null);

  const [employees, setEmployees] = useState<EmployeeDetail[]>([
    {
      id: 1,
      name: "Rahul Sharma",
      code: "EMP-101",
      email: "rahul@vrindavan.com",
      personalEmail: "rahul.sharma88@gmail.com",
      dept: "Engineering",
      role: "Software Engineer",
      mobile: "+91 98290 11223",
      altMobile: "+91 98290 11224",
      dob: "1994-06-12",
      gender: "Male",
      maritalStatus: "Married",
      bloodGroup: "O+",
      status: "Active",
      joinDate: "15 Jan 2024",
      salary: "₹65,000/mo",
      basicSalary: "39,000",
      hra: "15,600",
      otherAllowances: "10,400",
      bankName: "HDFC Bank",
      bankAccount: "••••4512",
      ifscCode: "HDFC0001234",
      accountType: "Salary Account",
      pan: "ABCDE1234F",
      aadhaar: "8921 4455 1209",
      shift: "General Day Shift (09:30 AM - 06:30 PM)",
      workLocation: "Vrindavan Central Campus",
      employmentType: "Full-time Permanent",
      emergencyContactName: "Rakesh Sharma (Father)",
      emergencyRelation: "Father",
      emergencyPhone: "+91 98290 99887",
      currentAddress: "Flat 402, Krishna Heights, Mathura Road, Vrindavan",
    },
    {
      id: 2,
      name: "Pooja Sharma",
      code: "EMP-102",
      email: "pooja@vrindavan.com",
      dept: "Sales",
      role: "Telecalling Lead",
      mobile: "+91 98290 88776",
      status: "Active",
      joinDate: "01 Mar 2024",
      salary: "₹38,000/mo",
      basicSalary: "22,800",
      hra: "9,120",
      otherAllowances: "6,080",
      bankName: "State Bank of India (SBI)",
      bankAccount: "••••8819",
      ifscCode: "SBIN0001889",
      pan: "XYZPA5678B",
      aadhaar: "7823 1122 9901",
      shift: "General Day Shift (09:30 AM - 06:30 PM)",
      workLocation: "Mathura Head Office",
      employmentType: "Full-time Permanent",
      emergencyContactName: "Mohan Sharma (Spouse)",
      emergencyRelation: "Spouse",
      emergencyPhone: "+91 98290 11992",
    },
    {
      id: 3,
      name: "Amit Kumar",
      code: "EMP-103",
      email: "amit@vrindavan.com",
      dept: "Sales",
      role: "Senior Sales Exec",
      mobile: "+91 98290 77889",
      status: "Active",
      joinDate: "10 Apr 2024",
      salary: "₹45,000/mo",
      basicSalary: "27,000",
      hra: "10,800",
      otherAllowances: "7,200",
      bankName: "ICICI Bank",
      bankAccount: "••••3321",
      pan: "DFGHK4321A",
      aadhaar: "6543 9876 1123",
      shift: "Morning Shift (08:00 AM - 04:30 PM)",
      workLocation: "Vrindavan Central Campus",
      employmentType: "Full-time Permanent",
    },
    {
      id: 4,
      name: "Priya Patel",
      code: "EMP-104",
      email: "priya@vrindavan.com",
      dept: "Design",
      role: "UI/UX Designer",
      mobile: "+91 98290 44556",
      status: "Active",
      joinDate: "05 Jun 2024",
      salary: "₹50,000/mo",
      basicSalary: "30,000",
      hra: "12,000",
      otherAllowances: "8,000",
      bankName: "Axis Bank",
      bankAccount: "••••7712",
      pan: "POIUY9876C",
      aadhaar: "4567 1234 8876",
      shift: "General Day Shift (09:30 AM - 06:30 PM)",
      workLocation: "Mathura Head Office",
      employmentType: "Full-time Permanent",
    },
    {
      id: 5,
      name: "Sneha Gupta",
      code: "EMP-105",
      email: "sneha@vrindavan.com",
      dept: "HR",
      role: "HR Executive",
      mobile: "+91 98290 33221",
      status: "Active",
      joinDate: "12 Jul 2024",
      salary: "₹35,000/mo",
      basicSalary: "21,000",
      hra: "8,400",
      otherAllowances: "5,600",
      bankName: "HDFC Bank",
      bankAccount: "••••9901",
      pan: "LKJHG6543D",
      aadhaar: "3456 7890 2211",
      shift: "General Day Shift (09:30 AM - 06:30 PM)",
      workLocation: "Mathura Head Office",
      employmentType: "Full-time Permanent",
    },
    {
      id: 6,
      name: "Vijay Singh",
      code: "EMP-106",
      email: "vijay@vrindavan.com",
      dept: "Finance",
      role: "Senior Accountant",
      mobile: "+91 98290 66554",
      status: "On Leave",
      joinDate: "20 Aug 2024",
      salary: "₹42,000/mo",
      basicSalary: "25,200",
      hra: "10,080",
      otherAllowances: "6,720",
      bankName: "Punjab National Bank (PNB)",
      bankAccount: "••••1188",
      pan: "MNBVC2345E",
      aadhaar: "2345 6789 3344",
      shift: "General Day Shift (09:30 AM - 06:30 PM)",
      workLocation: "Vrindavan Central Campus",
      employmentType: "Full-time Permanent",
    },
  ]);

  const filtered = employees.filter((e) => {
    const matchSearch = (
      e.name +
      e.email +
      e.code +
      e.role +
      (e.pan || "") +
      (e.aadhaar || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchDept = selectedDept === "All" || e.dept === selectedDept;
    return matchSearch && matchDept;
  });

  const handleEmployeeAdded = (newRecord: NewEmployeeRecord) => {
    setEmployees([newRecord as EmployeeDetail, ...employees]);
  };

  const handleExportCSV = () => {
    const headers = "Code,Name,Email,Department,Designation,Mobile,Salary,Shift,Status,Joined\n";
    const rows = filtered
      .map(
        (e) =>
          `"${e.code}","${e.name}","${e.email}","${e.dept}","${e.role}","${e.mobile}","${e.salary || ""}","${e.shift || ""}","${e.status}","${e.joinDate}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Employees_Master_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Employee master records exported as CSV.");
  };

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden p-1 sm:p-2">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Users className="size-6 text-primary" />
            Employees Master Directory
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Complete employee master records: Personal bio, Job designation, Salary structure & Bank details.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="h-8 text-xs gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
          <Button
            onClick={() => setShowAddModal(true)}
            size="sm"
            className="h-8 text-xs gap-1.5 font-semibold bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add New Employee
          </Button>
        </div>
      </div>

      {/* Directory Card */}
      <Card>
        <CardHeader className="p-4 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search by name, code, email, PAN, Aadhaar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-xs"
              />
            </div>
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger className="w-[150px] h-8 text-xs">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All" className="text-xs">All Departments</SelectItem>
                <SelectItem value="Sales" className="text-xs">Sales</SelectItem>
                <SelectItem value="Engineering" className="text-xs">Engineering</SelectItem>
                <SelectItem value="Design" className="text-xs">Design</SelectItem>
                <SelectItem value="HR" className="text-xs">HR</SelectItem>
                <SelectItem value="Finance" className="text-xs">Finance</SelectItem>
                <SelectItem value="Operations" className="text-xs">Operations</SelectItem>
                <SelectItem value="Telecalling" className="text-xs">Telecalling</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs font-semibold px-2 py-0.5">
              Total: {filtered.length} employees
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="text-xs font-bold w-[90px]">Code</TableHead>
                  <TableHead className="text-xs font-bold min-w-[180px]">Employee Bio</TableHead>
                  <TableHead className="text-xs font-bold">Department</TableHead>
                  <TableHead className="text-xs font-bold">Role / Title</TableHead>
                  <TableHead className="text-xs font-bold">Contact</TableHead>
                  <TableHead className="text-xs font-bold">Salary (CTC)</TableHead>
                  <TableHead className="text-xs font-bold">Bank A/C & PAN</TableHead>
                  <TableHead className="text-xs font-bold">Status</TableHead>
                  <TableHead className="text-xs font-bold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-xs text-muted-foreground">
                      No employees found matching &quot;{search}&quot;.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((emp) => (
                    <TableRow key={emp.id} className="text-xs hover:bg-muted/30">
                      <TableCell className="font-mono font-bold text-primary">{emp.code}</TableCell>
                      <TableCell className="font-medium text-foreground">
                        <div className="font-semibold text-foreground flex items-center gap-1.5">
                          {emp.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground font-normal">{emp.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] font-normal">
                          {emp.dept}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground font-medium">{emp.role}</TableCell>
                      <TableCell className="text-foreground">{emp.mobile}</TableCell>
                      <TableCell className="font-semibold text-foreground font-mono">
                        {emp.salary || "₹35,000/mo"}
                      </TableCell>
                      <TableCell className="text-muted-foreground font-mono text-[11px]">
                        <div>{emp.bankAccount || "Pending"}</div>
                        <div className="text-[10px] text-muted-foreground/80">{emp.pan || "PAN N/A"}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-semibold ${
                            emp.status === "Active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : "bg-purple-50 text-purple-700 border-purple-300"
                          }`}
                        >
                          {emp.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-primary"
                            title="Quick View Record"
                            onClick={() => setSelectedEmployee(emp)}
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                            asChild
                            title="Full Profile"
                          >
                            <Link to="/hr-dashboard/employees/$id" params={{ id: String(emp.id) }}>
                              <User className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                            onClick={() => toast.info(`Editing master record for ${emp.name}`)}
                            title="Edit"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Production-grade Multi-tab Add Employee Dialog */}
      <AddEmployeeDialog
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onEmployeeAdded={handleEmployeeAdded}
        nextEmployeeId={employees.length + 101}
      />

      {/* Quick View Employee Master Details Modal */}
      {selectedEmployee && (
        <Dialog open={!!selectedEmployee} onOpenChange={(open) => !open && setSelectedEmployee(null)}>
          <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[88vh] overflow-y-auto p-5">
            <DialogHeader className="border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-base font-bold flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    {selectedEmployee.name}
                    <Badge variant="outline" className="font-mono text-xs">
                      {selectedEmployee.code}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription className="text-xs">
                    {selectedEmployee.role} • {selectedEmployee.dept} Department
                  </DialogDescription>
                </div>
                <Badge
                  variant="outline"
                  className={
                    selectedEmployee.status === "Active"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                      : "bg-purple-50 text-purple-700 border-purple-300"
                  }
                >
                  {selectedEmployee.status}
                </Badge>
              </div>
            </DialogHeader>

            <div className="space-y-4 text-xs pt-3">
              {/* Personal Section */}
              <div className="border rounded-lg p-3 bg-muted/20 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-foreground border-b pb-1.5">
                  <User className="h-3.5 w-3.5 text-primary" />
                  Personal Information
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-muted-foreground">
                  <div>
                    <span className="font-semibold text-foreground">Official Email:</span>
                    <div>{selectedEmployee.email}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Personal Email:</span>
                    <div>{selectedEmployee.personalEmail || "N/A"}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Primary Mobile:</span>
                    <div>{selectedEmployee.mobile}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">DOB & Gender:</span>
                    <div>
                      {selectedEmployee.dob || "N/A"} ({selectedEmployee.gender || "Male"})
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Blood Group:</span>
                    <div>{selectedEmployee.bloodGroup || "O+"}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Marital Status:</span>
                    <div>{selectedEmployee.maritalStatus || "Single"}</div>
                  </div>
                </div>
                {selectedEmployee.currentAddress && (
                  <div className="pt-1 text-muted-foreground">
                    <span className="font-semibold text-foreground">Current Address:</span>
                    <div>{selectedEmployee.currentAddress}</div>
                  </div>
                )}
              </div>

              {/* Job Section */}
              <div className="border rounded-lg p-3 bg-muted/20 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-foreground border-b pb-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-primary" />
                  Job & Shift Details
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-muted-foreground">
                  <div>
                    <span className="font-semibold text-foreground">Date of Joining:</span>
                    <div>{selectedEmployee.joinDate}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Employment Type:</span>
                    <div>{selectedEmployee.employmentType || "Full-time Permanent"}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Work Location:</span>
                    <div>{selectedEmployee.workLocation || "Vrindavan Campus"}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-foreground">Assigned Shift:</span>
                    <div>{selectedEmployee.shift || "General Day Shift (09:30 AM - 06:30 PM)"}</div>
                  </div>
                </div>
              </div>

              {/* Financial Section */}
              <div className="border rounded-lg p-3 bg-muted/20 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-foreground border-b pb-1.5">
                  <CreditCard className="h-3.5 w-3.5 text-primary" />
                  Financial & Banking Structure
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-muted-foreground">
                  <div>
                    <span className="font-semibold text-foreground">Monthly CTC:</span>
                    <div className="font-bold text-foreground font-mono">
                      {selectedEmployee.salary || "₹35,000/mo"}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Bank Name:</span>
                    <div>{selectedEmployee.bankName || "State Bank of India"}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Account Number:</span>
                    <div className="font-mono">{selectedEmployee.bankAccount || "Pending"}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">IFSC Code:</span>
                    <div className="font-mono">{selectedEmployee.ifscCode || "SBIN0001244"}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">PAN Number:</span>
                    <div className="font-mono font-bold text-foreground">
                      {selectedEmployee.pan || "N/A"}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Account Type:</span>
                    <div>{selectedEmployee.accountType || "Salary Account"}</div>
                  </div>
                </div>
              </div>

              {/* Identity & Emergency */}
              <div className="border rounded-lg p-3 bg-muted/20 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-foreground border-b pb-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  Identity & Emergency Contact
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-muted-foreground">
                  <div>
                    <span className="font-semibold text-foreground">Aadhaar Card:</span>
                    <div className="font-mono">{selectedEmployee.aadhaar || "Pending"}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Emergency Contact:</span>
                    <div>{selectedEmployee.emergencyContactName || "Guardian"}</div>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Emergency Phone:</span>
                    <div>{selectedEmployee.emergencyPhone || "+91 98290 00000"}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedEmployee(null)}
                className="h-8 text-xs"
              >
                Close Preview
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
