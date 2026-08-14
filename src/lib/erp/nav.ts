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
