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
  type LucideIcon,
} from "lucide-react";

export type NavItem = { title: string; url: string; icon: LucideIcon };
export type NavSection = { label?: string; items: NavItem[] };

export const navSections: NavSection[] = [
  {
    items: [{ title: "Dashboard", url: "/", icon: LayoutDashboard }],
  },
  {
    label: "CRM & Leads",
    items: [
      { title: "Leads Management", url: "/leads", icon: Users },
      { title: "Clients", url: "/clients", icon: UserCheck },
      { title: "Sales Pipeline", url: "/pipeline", icon: GitBranch },
      { title: "Follow-ups", url: "/followups", icon: PhoneCall },
    ],
  },
  {
    label: "Property Management",
    items: [
      { title: "Projects", url: "/projects", icon: Building2 },
      { title: "Properties", url: "/properties", icon: Home },
      { title: "Bookings", url: "/bookings", icon: BookMarked },
      { title: "Inventory", url: "/inventory", icon: Boxes },
      { title: "Site Visits", url: "/site-visits", icon: MapPin },
    ],
  },
  {
    label: "Finance & Accounts",
    items: [
      { title: "Payments", url: "/payments", icon: Wallet },
      { title: "Invoices", url: "/invoices", icon: FileText },
      { title: "Expenses", url: "/expenses", icon: Receipt },
      { title: "Reports", url: "/reports", icon: BarChart3 },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Team Management", url: "/team", icon: UsersRound },
      { title: "Tasks", url: "/tasks", icon: ListChecks },
      { title: "Calendar", url: "/calendar", icon: CalendarDays },
      { title: "Documents", url: "/documents", icon: FolderOpen },
    ],
  },
  {
    label: "Marketing",
    items: [
      { title: "Campaigns", url: "/campaigns", icon: Megaphone },
      { title: "Enquiries", url: "/enquiries", icon: MessageSquare },
    ],
  },
  {
    label: "Settings",
    items: [
      { title: "Organization", url: "/organization", icon: Building },
      { title: "Users & Roles", url: "/users-roles", icon: ShieldCheck },
    ],
  },
];
