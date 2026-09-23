/**
 * HR Dashboard Dedicated API Client & Data Services
 * Fully aligned with CrmAttendance2 hr-dashboard
 */

export interface HrKpi {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

export interface HrEmployee {
  id: number;
  name: string;
  email?: string;
  dept: string;
  role?: string;
  checkIn: string;
  checkOut: string;
  hours: string;
  status: "Present" | "Late" | "Absent" | "On Leave" | "WFH";
  location: string;
  avatar?: string;
}

export interface HrLeaveRequest {
  id: number;
  employee_name: string;
  dept: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface HrAlert {
  id: number;
  title: string;
  message: string;
  time: string;
  severity: "warning" | "danger" | "info";
}

export interface HrShift {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  grace_period_mins: number;
  assigned_count: number;
}

export interface HrSalaryRecord {
  id: number;
  name: string;
  dept: string;
  base_salary: number;
  deductions: number;
  incentives: number;
  net_payable: number;
  status: "Paid" | "Pending" | "Processing";
}

// Default Live Mock Data matching CrmAttendance2 hr-dashboard/data/mock-data.ts

export const defaultHrKpis: HrKpi[] = [
  { title: "Total Employees", value: "1,247", change: "+12%", trend: "up" },
  { title: "Active Today", value: "1,089", change: "+45", trend: "up" },
  { title: "Absent Today", value: "67", change: "-8", trend: "down" },
  { title: "Late Check-ins", value: "23", change: "+5", trend: "up" },
  { title: "On Leave", value: "54", change: "+3", trend: "up" },
  { title: "WFH", value: "89", change: "+12", trend: "up" },
  { title: "Avg Hours", value: "8.2h", change: "+0.3h", trend: "up" },
  { title: "Compliance", value: "94.2%", change: "+2.1%", trend: "up" },
];

export const defaultAttendanceTrend = [
  { day: "Mon", present: 1050, absent: 45, wfh: 78, leave: 74 },
  { day: "Tue", present: 1080, absent: 38, wfh: 82, leave: 47 },
  { day: "Wed", present: 1065, absent: 52, wfh: 75, leave: 55 },
  { day: "Thu", present: 1090, absent: 35, wfh: 80, leave: 42 },
  { day: "Fri", present: 1020, absent: 60, wfh: 95, leave: 72 },
];

export const defaultPieData = [
  { name: "Present", value: 1089, color: "#22c55e" },
  { name: "Absent", value: 67, color: "#ef4444" },
  { name: "On Leave", value: 54, color: "#f59e0b" },
  { name: "WFH", value: 89, color: "#3b82f6" },
];

export const defaultHrAlerts: HrAlert[] = [
  { id: 1, title: "Not checked in", message: "Rahul Sharma has not checked in yet", time: "Expected 9:00 AM", severity: "warning" },
  { id: 2, title: "Late arrival", message: "Priya Patel arrived 45 mins late", time: "10:45 AM", severity: "danger" },
  { id: 3, title: "Geo-fence issue", message: "Amit Kumar checked in outside the allowed range", time: "9:15 AM", severity: "danger" },
  { id: 4, title: "Missing checkout", message: "Sneha Gupta missed yesterday's checkout", time: "Yesterday", severity: "warning" },
];

export const defaultEmployees: HrEmployee[] = [
  { id: 1, name: "Rahul Sharma", dept: "Engineering", role: "Software Engineer", checkIn: "09:02 AM", checkOut: "06:15 PM", hours: "9h 13m", status: "Present", location: "Main Branch" },
  { id: 2, name: "Priya Patel", dept: "Design", role: "UI/UX Designer", checkIn: "10:45 AM", checkOut: "-", hours: "5h 30m", status: "Late", location: "Main Branch" },
  { id: 3, name: "Amit Kumar", dept: "Sales", role: "Senior Sales Exec", checkIn: "09:15 AM", checkOut: "06:00 PM", hours: "8h 45m", status: "Present", location: "Site Office" },
  { id: 4, name: "Sneha Gupta", dept: "HR", role: "HR Executive", checkIn: "08:55 AM", checkOut: "05:30 PM", hours: "8h 35m", status: "Present", location: "WFH" },
  { id: 5, name: "Vijay Singh", dept: "Finance", role: "Accountant", checkIn: "-", checkOut: "-", hours: "-", status: "Absent", location: "-" },
  { id: 6, name: "Anjali Verma", dept: "Marketing", role: "Digital Marketer", checkIn: "09:00 AM", checkOut: "06:30 PM", hours: "9h 30m", status: "Present", location: "Main Branch" },
  { id: 7, name: "Karan Mehta", dept: "Sales", role: "Telecaller", checkIn: "09:28 AM", checkOut: "06:30 PM", hours: "9h 02m", status: "Present", location: "Main Branch" },
  { id: 8, name: "Pooja Sharma", dept: "Sales", role: "Telecalling Lead", checkIn: "09:25 AM", checkOut: "06:35 PM", hours: "9h 10m", status: "Present", location: "Main Branch" },
];

export const defaultLeaveRequests: HrLeaveRequest[] = [
  { id: 1, employee_name: "Vijay Singh", dept: "Finance", leave_type: "Casual Leave", start_date: "2026-09-24", end_date: "2026-09-25", days: 2, reason: "Family event in hometown", status: "Pending" },
  { id: 2, employee_name: "Priya Patel", dept: "Design", leave_type: "Sick Leave", start_date: "2026-09-23", end_date: "2026-09-23", days: 1, reason: "Severe headache and fever", status: "Pending" },
  { id: 3, employee_name: "Karan Mehta", dept: "Sales", leave_type: "Half Day", start_date: "2026-09-26", end_date: "2026-09-26", days: 0.5, reason: "Personal bank documentation", status: "Approved" },
];

export const defaultSalaryRecords: HrSalaryRecord[] = [
  { id: 1, name: "Rahul Sharma", dept: "Engineering", base_salary: 65000, deductions: 2500, incentives: 5000, net_payable: 67500, status: "Paid" },
  { id: 2, name: "Pooja Sharma", dept: "Sales", base_salary: 25000, deductions: 1000, incentives: 14000, net_payable: 38000, status: "Paid" },
  { id: 3, name: "Amit Kumar", dept: "Sales", base_salary: 35000, deductions: 1500, incentives: 22000, net_payable: 55500, status: "Processing" },
  { id: 4, name: "Priya Patel", dept: "Design", base_salary: 45000, deductions: 1800, incentives: 0, net_payable: 43200, status: "Pending" },
];

export const defaultShifts: HrShift[] = [
  { id: 1, name: "General Day Shift", start_time: "09:30 AM", end_time: "06:30 PM", grace_period_mins: 15, assigned_count: 850 },
  { id: 2, name: "Morning Telecalling Shift", start_time: "08:30 AM", end_time: "05:30 PM", grace_period_mins: 10, assigned_count: 240 },
  { id: 3, name: "Evening Support Shift", start_time: "01:00 PM", end_time: "10:00 PM", grace_period_mins: 15, assigned_count: 157 },
];
