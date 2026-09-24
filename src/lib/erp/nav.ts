import {
  LayoutDashboard,
  Users,
  UserCheck,
  GitBranch,
  PhoneCall,
  Building2,
  Home,
  BookMarked,
  Boxes,
  MapPin,
  Wallet,
  FileText,
  Receipt,
  BarChart3,
  UsersRound,
  ListChecks,
  CalendarDays,
  FolderOpen,
  Megaphone,
  MessageSquare,
  Building,
  ShieldCheck,
  IndianRupee,
  Briefcase,
  UploadCloud,
  History,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  FilePlus,
  DollarSign,
  FolderKanban,
  FileCheck,
  ScanFace,
  Camera,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  url?: string;
  icon: LucideIcon;
  items?: NavItem[];
};
export type NavSection = { label?: string; items: NavItem[] };

export const navSections: NavSection[] = [
  {
    items: [{ title: "Dashboard", url: "/", icon: LayoutDashboard }],
  },
  {
    label: "Admin CRM Controls",
    items: [
      {
        title: "Users Management",
        icon: Users,
        items: [
          { title: "Team Leaders", url: "/admin/users/team-leader", icon: Briefcase },
          { title: "Staff Telecallers", url: "/admin/users/staff", icon: PhoneCall },
          { title: "Staff Earnings", url: "/admin/users/staff/earn", icon: DollarSign },
          { title: "Staff Incentives", url: "/admin/users/staff/incentives", icon: IndianRupee },
        ],
      },
      {
        title: "Productivity",
        icon: BarChart3,
        items: [
          { title: "Team Leader Productivity", url: "/admin/productivity/team-leader", icon: Briefcase },
          { title: "Staff Productivity", url: "/admin/productivity/staff", icon: PhoneCall },
          { title: "Associates Productivity", url: "/admin/productivity/associates", icon: UsersRound },
        ],
      },
      {
        title: "Leads Reports",
        icon: FileText,
        items: [
          { title: "All Leads", url: "/admin/leads-report/total-leads", icon: Building2 },
          { title: "Interested (Hot)", url: "/admin/leads-report/interested", icon: CheckCircle },
          { title: "Site Visits", url: "/admin/leads-report/visit", icon: Eye },
          { title: "Not Picked", url: "/admin/leads-report/not-picked", icon: PhoneCall },
          { title: "Other Location", url: "/admin/leads-report/other-location", icon: MapPin },
          { title: "Not Interested", url: "/admin/leads-report/not-interested", icon: XCircle },
          { title: "Lost Leads", url: "/admin/leads-report/lost", icon: History },
          { title: "Total Earnings", url: "/admin/leads-report/total-earning", icon: IndianRupee },
        ],
      },
      {
        title: "Marketing Channels",
        icon: Megaphone,
        items: [
          { title: "WhatsApp Broadcast", url: "/admin/marketing/whatsapp", icon: MessageSquare },
          { title: "Google Ads", url: "/admin/marketing/google", icon: Megaphone },
          { title: "Facebook Lead Ads", url: "/admin/marketing/facebook", icon: Megaphone },
          { title: "LinkedIn B2B", url: "/admin/marketing/linkedin", icon: Megaphone },
        ],
      },
      {
        title: "Time Sheet",
        url: "/admin/timesheet",
        icon: CalendarDays,
      },
      {
        title: "Projects",
        icon: Building,
        items: [
          { title: "Dashboard", url: "/admin/project/dashboard", icon: LayoutDashboard },
          { title: "Projects", url: "/admin/project/all", icon: Building },
          { title: "Sprints", url: "/admin/project/sprints", icon: Clock },
          { title: "MileStone", url: "/admin/project/MileStone", icon: CheckCircle },
          { title: "Tasks", url: "/admin/project/tasks", icon: ListChecks },
          { title: "Team", url: "/admin/project/team", icon: Users },
        ],
      },
      {
        title: "Add Sell Booking",
        url: "/admin/add-sell",
        icon: FilePlus,
      },
    ],
  },
  {
    label: "Superadmin Controls",
    items: [
      {
        title: "Users",
        icon: Users,
        items: [
          { title: "Staff Users", url: "/superadmin/users/staff", icon: PhoneCall },
          { title: "Team Leaders", url: "/superadmin/users/team-leader", icon: Briefcase },
          { title: "Admins", url: "/superadmin/users/admin", icon: ShieldCheck },
          { title: "Associates", url: "/superadmin/users/associates", icon: UsersRound },
          { title: "IT Staff", url: "/superadmin/users/it-staff", icon: Boxes },
          { title: "HR Users", url: "/superadmin/users/hr", icon: UserCheck },
          { title: "All Users Hub", url: "/superadmin/manage-users", icon: Users },
          { title: "Staff Earn Calendar", url: "/superadmin/users/staff-earn", icon: CalendarDays },
          { title: "Associate Incentives", url: "/superadmin/users/associates-incentives", icon: IndianRupee },
        ],
      },
      {
        title: "Company-Wide Leads",
        icon: Building2,
        items: [
          { title: "All Leads Pipeline", url: "/superadmin/leads", icon: Building2 },
          { title: "Follow-up Queues", url: "/superadmin/leads/followups", icon: ListChecks },
          { title: "Bulk Lead Import", url: "/superadmin/leads/import", icon: UploadCloud },
          { title: "Lead History & Timeline", url: "/superadmin/leads/history", icon: History },
        ],
      },
      {
        title: "Add Sell Booking",
        url: "/superadmin/add-sell",
        icon: FileText,
      },
      {
        title: "Productivity & Reports",
        icon: BarChart3,
        items: [
          { title: "Staff Productivity Index", url: "/superadmin/reports", icon: BarChart3 },
          { title: "Earnings & Incentives", url: "/superadmin/reports/earnings", icon: DollarSign },
        ],
      },
      {
        title: "Audit Timesheet & Logs",
        url: "/superadmin/timesheet",
        icon: CalendarDays,
      },
      {
        title: "Projects (PMS)",
        icon: Building,
        items: [
          { title: "Dashboard", url: "/superadmin/project/dashboard", icon: LayoutDashboard },
          { title: "Projects", url: "/superadmin/project/all", icon: Building },
          { title: "Sprints", url: "/superadmin/project/sprints", icon: Clock },
          { title: "MileStone", url: "/superadmin/project/MileStone", icon: CheckCircle },
          { title: "Tasks", url: "/superadmin/project/tasks", icon: ListChecks },
          { title: "Team", url: "/superadmin/project/team", icon: Users },
        ],
      },
    ],
  },
  {
    label: "Team Leader Portal",
    items: [
      {
        title: "Projects",
        icon: Building,
        items: [
          { title: "Dashboard", url: "/team-leader/project/dashboard", icon: LayoutDashboard },
          { title: "Projects", url: "/team-leader/project/all", icon: Building },
          { title: "Sprints", url: "/team-leader/project/sprints", icon: Clock },
          { title: "MileStone", url: "/team-leader/project/MileStone", icon: CheckCircle },
          { title: "Tasks", url: "/team-leader/project/tasks", icon: ListChecks },
          { title: "Team", url: "/team-leader/project/team", icon: Users },
        ],
      },
      {
        title: "Productivity",
        icon: BarChart3,
        items: [
          { title: "Staff Productivity", url: "/team-leader/productivity/staff", icon: PhoneCall },
          { title: "Associates Productivity", url: "/team-leader/productivity/associates", icon: UsersRound },
        ],
      },
      {
        title: "Leads",
        url: "/team-leader/leads",
        icon: FolderOpen,
      },
      {
        title: "Leads Report",
        icon: FileText,
        items: [
          { title: "Today Followups", url: "/team-leader/leads-report/today-followups", icon: Clock },
          { title: "Pending Followups", url: "/team-leader/leads-report/pending-followups", icon: History },
          { title: "Tomorrow Followups", url: "/team-leader/leads-report/tomorrow-followups", icon: CalendarDays },
          { title: "Interested", url: "/team-leader/leads-report/interested", icon: CheckCircle },
          { title: "Visit", url: "/team-leader/leads-report/visit", icon: Eye },
        ],
      },
      {
        title: "Marketing",
        icon: Megaphone,
        items: [
          { title: "WhatsApp", url: "/team-leader/marketing/whatsapp", icon: MessageSquare },
          { title: "Google", url: "/team-leader/marketing/google", icon: Megaphone },
          { title: "Facebook", url: "/team-leader/marketing/facebook", icon: Megaphone },
          { title: "LinkedIn", url: "/team-leader/marketing/linkedin", icon: Megaphone },
        ],
      },
      {
        title: "Time Sheet",
        url: "/team-leader/timesheet",
        icon: CalendarDays,
      },
      {
        title: "Add Sell",
        url: "/team-leader/add-sell",
        icon: FilePlus,
      },
    ],
  },
  {
    label: "Staff Portal",
    items: [
      {
        title: "Staff Dashboard",
        url: "/staff/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Projects",
        icon: FolderKanban,
        items: [
          { title: "My Projects", url: "/staff/projects", icon: FolderOpen },
          { title: "My Tasks", url: "/staff/tasks", icon: ListChecks },
        ],
      },
      {
        title: "Productivity",
        url: "/staff/productivity",
        icon: BarChart3,
      },
      {
        title: "Incentives",
        url: "/staff/incentives",
        icon: IndianRupee,
      },
      {
        title: "Earn & Attendance",
        url: "/staff/earn",
        icon: CalendarDays,
      },
      {
        title: "Calling Leads",
        url: "/staff/leads",
        icon: PhoneCall,
      },
      {
        title: "Leads Report",
        icon: FileText,
        items: [
          { title: "Total Leads", url: "/staff/reports/total-leads", icon: Building2 },
          { title: "Interested", url: "/staff/reports/interested", icon: CheckCircle },
          { title: "Not Interested", url: "/staff/reports/not-interested", icon: XCircle },
          { title: "Visit Scheduled", url: "/staff/reports/visit", icon: Eye },
          { title: "Not Picked", url: "/staff/reports/not-picked", icon: PhoneCall },
          { title: "Other Location", url: "/staff/reports/other-location", icon: MapPin },
          { title: "Today Followups", url: "/staff/reports/today-followups", icon: Clock },
          { title: "Tomorrow Followups", url: "/staff/reports/tomorrow-followups", icon: CalendarDays },
          { title: "Pending Followups", url: "/staff/reports/pending-followups", icon: History },
        ],
      },
      {
        title: "Marketing",
        icon: Megaphone,
        items: [
          { title: "WhatsApp", url: "/staff/marketing/whatsapp", icon: MessageSquare },
          { title: "Google", url: "/staff/marketing/google", icon: Megaphone },
          { title: "Facebook", url: "/staff/marketing/facebook", icon: Megaphone },
          { title: "LinkedIn", url: "/staff/marketing/linkedin", icon: Megaphone },
        ],
      },
      {
        title: "Time Sheet",
        url: "/staff/timesheet",
        icon: Clock,
      },
      {
        title: "HR Overview",
        url: "/staff/overview",
        icon: UsersRound,
      },
    ],
  },
  {
    label: "HR Portal",
    items: [
      {
        title: "HR Dashboard",
        url: "/hr-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Employees",
        icon: Users,
        items: [
          { title: "All Employees", url: "/hr-dashboard/employees/all", icon: Users },
          { title: "Onboarding", url: "/hr-dashboard/employees/onboarding", icon: UserCheck },
          { title: "ID Studio", url: "/hr-dashboard/employees/id-studio", icon: FileText },
          { title: "Asset Management", url: "/hr-dashboard/employees/manage-assets", icon: Boxes },
        ],
      },
      {
        title: "Attendance",
        icon: Clock,
        items: [
          { title: "My Face Attendance", url: "/hr-dashboard/attendance/face-punch", icon: ScanFace },
          { title: "Attendance List", url: "/hr-dashboard/attendance/list", icon: ListChecks },
          { title: "Attendance Calendar", url: "/hr-dashboard/attendance/calendar", icon: CalendarDays },
          { title: "Activity Logs", url: "/hr-dashboard/attendance/logs", icon: History },
          { title: "Leave Requests", url: "/hr-dashboard/attendance/leave-requests", icon: CheckCircle },
          { title: "Leave Type", url: "/hr-dashboard/attendance/leave-type", icon: FileText },
          { title: "Adjust Paid Leave", url: "/hr-dashboard/attendance/adjust-leave", icon: FileCheck },
        ],
      },
      {
        title: "Manual Attendance",
        url: "/hr-dashboard/manual-attendance",
        icon: ListChecks,
      },
      {
        title: "Tasks & Workflows",
        icon: FolderKanban,
        items: [
          { title: "Task Board", url: "/hr-dashboard/tasks/board", icon: ListChecks },
          { title: "Face Update Requests", url: "/hr-dashboard/tasks/face-updates", icon: UserCheck },
        ],
      },
      {
        title: "Finance & Payroll",
        icon: IndianRupee,
        items: [
          { title: "Employee Salary", url: "/hr-dashboard/finance/salary", icon: IndianRupee },
          { title: "Loan Requests", url: "/hr-dashboard/finance/loans", icon: Wallet },
          { title: "Reimbursements", url: "/hr-dashboard/finance/reimbursements", icon: Receipt },
          { title: "Payslips", url: "/hr-dashboard/finance/payslips", icon: FileText },
        ],
      },
      {
        title: "Shift Management",
        icon: Clock,
        items: [
          { title: "Custom Shifts", url: "/hr-dashboard/shifts/custom", icon: Clock },
          { title: "Shift Assignment", url: "/hr-dashboard/shifts/assignment", icon: CalendarDays },
        ],
      },
      {
        title: "Company Settings",
        icon: Building,
        items: [
          { title: "Holidays Calendar", url: "/hr-dashboard/settings/holidays", icon: CalendarDays },
          { title: "Rules & Regulations", url: "/hr-dashboard/settings/rules", icon: ShieldCheck },
        ],
      },
      {
        title: "Support Tickets",
        url: "/hr-dashboard/support/tickets",
        icon: MessageSquare,
      },
      {
        title: "HR Profile",
        url: "/hr-dashboard/profile",
        icon: UsersRound,
      },
    ],
  },
  {
    label: "Telecalling CRM",
    items: [
      { title: "Calling Dashboard", url: "/staff/dashboard", icon: PhoneCall },
      { title: "Staff Calling Leads", url: "/staff/leads", icon: ListChecks },
    ],
  },
  {
    label: "Masters",
    items: [
      {
        title: "Masters",
        icon: Boxes,
        items: [
          { title: "General Masters", url: "/admin/masters/general", icon: Boxes },
          { title: "Inquiry Status", url: "/admin/masters/inquiry-status", icon: ListChecks },
          { title: "Source", url: "/admin/masters/source", icon: Megaphone },
          { title: "Locality", url: "/admin/masters/locality", icon: MapPin },
          { title: "Budget", url: "/admin/masters/budget", icon: IndianRupee },
          { title: "Broker", url: "/admin/masters/broker", icon: Users },
        ],
      },
      { title: "Expense Entry", url: "/admin/masters/expense-entry", icon: Receipt },
      { title: "Visitor Entry", url: "/admin/masters/visitor-entry", icon: UserCheck },
      { title: "Birthday / Anniversary", url: "/admin/masters/bday-anniv", icon: CalendarDays },
      { title: "Customer", url: "/admin/masters/customer", icon: UsersRound },
    ],
  },
  {
    label: "Associates",
    items: [
      {
        title: "Associates",
        icon: UsersRound,
        items: [
          { title: "Associate Form List", url: "/admin/associates/list", icon: Users },
          { title: "Associate OTP", url: "/admin/associates/otp", icon: ShieldCheck },
          { title: "Associate Tree", url: "/admin/associates/tree", icon: GitBranch },
          { title: "Associate Commission", url: "/admin/associates/commission", icon: IndianRupee },
          { title: "Attendance", url: "/admin/associates/attendance", icon: ListChecks },
          { title: "Generate Attendance", url: "/admin/associates/generate-attendance", icon: ListChecks },
          { title: "Associate Transfer", url: "/admin/associates/transfer", icon: UserCheck },
        ],
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        title: "Project",
        icon: Building2,
        items: [
          {
            title: "Apartment / Commercial",
            icon: Building,
            items: [
              { title: "Apartment List", url: "/admin/projects/apartment-commercial/list", icon: Building },
              { title: "Building List", url: "/admin/projects/apartment-commercial/building", icon: Building },
              { title: "Floor List", url: "/admin/projects/apartment-commercial/floor", icon: Building },
              { title: "Flat List", url: "/admin/projects/apartment-commercial/flat", icon: Building },
              { title: "Commercial List", url: "/admin/projects/apartment-commercial/commercial", icon: Building },
            ]
          },
          { title: "Project List", url: "/projects", icon: Building2 },
          { title: "Plot List", url: "/admin/projects/plot-list", icon: MapPin },
          { title: "Rowhouse List", url: "/admin/projects/rowhouse-list", icon: Home },
          { title: "Member List", url: "/admin/projects/member-list", icon: Users },
          { title: "Update Inventory", url: "/admin/projects/update-inventory", icon: Boxes },
          { title: "Inventory List", url: "/admin/projects/inventory-list", icon: Boxes },
          { title: "Unit Boundaries", url: "/admin/projects/unit-boundaries", icon: MapPin },
          { title: "Facebook Form Map", url: "/admin/projects/facebook-form-map", icon: Megaphone },
          { title: "WhatsApp Campaign Map", url: "/admin/projects/whatsapp-campaign-map", icon: MessageSquare },
          { title: "Website Campaign Map", url: "/admin/projects/website-campaign-map", icon: MessageSquare },
        ],
      },
      {
        title: "Lead",
        icon: Users,
        items: [
          { title: "Lead List", url: "/leads", icon: Users },
          { title: "Lead Timeline", url: "/admin/leads/timeline", icon: ListChecks },
          { title: "Source Wise Lead Assignment", url: "/admin/leads/assignment", icon: UserCheck },
        ],
      },
      { title: "Site Visit", url: "/site-visits", icon: MapPin },
      {
        title: "Booking",
        icon: BookMarked,
        items: [
          { title: "Booking", url: "/bookings", icon: BookMarked },
          { title: "Booking Draft Template", url: "/admin/crm/booking-draft-template", icon: FileText },
          { title: "Booking Disbursement", url: "/admin/crm/booking-disbursement", icon: IndianRupee },
        ],
      },
      {
        title: "Post-Sales",
        icon: Wallet,
        items: [
          { title: "Payment", url: "/payments", icon: Wallet },
          { title: "Loan Progress", url: "/admin/post-sales/loan-progress", icon: FileText },
          {
            title: "Associate Payments",
            icon: IndianRupee,
            items: [
              { title: "Payment to Associate", url: "/admin/post-sales/associate-payments/list", icon: IndianRupee },
              { title: "Advance Adjustment", url: "/admin/post-sales/associate-payments/advance-adjustment", icon: IndianRupee },
              { title: "Generate Commission", url: "/admin/post-sales/associate-payments/generate-commission", icon: IndianRupee },
              { title: "Payment Report", url: "/admin/post-sales/associate-payments/payment-report", icon: IndianRupee },
              { title: "Payment to Vendor", url: "/admin/post-sales/associate-payments/payment-to-vendor", icon: IndianRupee },
            ]
          },
          { title: "Project Demand", url: "/admin/post-sales/project-demand", icon: FileText },
          { title: "Booking Demand", url: "/admin/post-sales/booking-demand", icon: FileText },
          { title: "Day Book", url: "/admin/post-sales/day-book", icon: BookMarked },
        ],
      },
      {
        title: "Call/SMS",
        icon: PhoneCall,
        items: [
          {
            title: "Social",
            icon: MessageSquare,
            items: [
              { title: "External Resource", url: "/admin/social/external-resource", icon: Megaphone },
              { title: "Integration", url: "/admin/social/integration", icon: MessageSquare },
            ],
          },
          {
            title: "Reports",
            icon: BarChart3,
            items: [
              { title: "Associate Reports", url: "/admin/reports/associate", icon: UsersRound },
              { title: "Booking Reports", url: "/admin/reports/booking", icon: BookMarked },
              { title: "Customer Reports", url: "/admin/reports/customer", icon: Users },
              { title: "Project Reports", url: "/admin/reports/project", icon: Building2 },
              { title: "Lead Reports", url: "/admin/reports/lead", icon: Users },
              { title: "Site Visit Reports", url: "/admin/reports/site-visit", icon: MapPin },
              { title: "EMI Reports", url: "/admin/reports/emi", icon: IndianRupee },
              { title: "System Logs", url: "/admin/reports/logs", icon: ShieldCheck },
              { title: "Lead Assign by", url: "/admin/call-sms/lead-assign", icon: UsersRound },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Settings/Others",
    items: [
      {
        title: "Settings",
        icon: Building,
        items: [
          { title: "Settings", url: "/settings", icon: Building },
          { title: "User Permission", url: "/admin/settings/user-permission", icon: ShieldCheck },
          { title: "Dashboard Permission", url: "/admin/settings/dashboard-permission", icon: LayoutDashboard },
          { title: "Banner", url: "/admin/settings/banner", icon: FileText },
          { title: "External Resource", url: "/admin/settings/ext-resource", icon: Megaphone },
          { title: "Commission Slab", url: "/admin/settings/commission-slab", icon: IndianRupee },
          { title: "Role Mapping", url: "/admin/settings/role-mapping", icon: ShieldCheck },
          { title: "WhatsApp Setting", url: "/admin/settings/whatsapp", icon: MessageSquare },
          { title: "WhatsApp Schedule", url: "/admin/settings/whatsapp-schedule", icon: MessageSquare },
        ],
      },
      {
        title: "Member Panel",
        icon: UsersRound,
        items: [
          { title: "Setting", url: "/admin/member-panel/setting", icon: Building },
          { title: "Extra Field Mapping", url: "/admin/member-panel/extra-field", icon: ListChecks },
          { title: "User Permission", url: "/admin/member-panel/user-permission", icon: ShieldCheck },
          { title: "Open Panel", url: "/admin/member-panel/open", icon: Building },
        ],
      },
      {
        title: "About Us",
        icon: Building,
        items: [
          { title: "Privacy Policy", url: "/admin/about/privacy", icon: FileText },
          { title: "Terms & Conditions", url: "/admin/about/terms", icon: FileText },
        ],
      },
    ],
  },
];
