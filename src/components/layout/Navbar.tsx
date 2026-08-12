import { Link, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  CalendarDays,
  Menu,
  MessageSquare,
  Moon,
  Search,
  Sun,
  ChevronDown,
  User,
  Settings,
  Activity,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navSections } from "@/lib/erp/nav";

const notifications = [
  { title: "New lead assigned", desc: "Rahul Sharma • Suryax Greens", time: "2m" },
  { title: "Payment received", desc: "₹12.50 Lakh • BK1024", time: "1h" },
  { title: "Site visit scheduled", desc: "Royal Residency • 11:30 AM", time: "3h" },
  { title: "Invoice overdue", desc: "INV-2026-104", time: "1d" },
];

export function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("suryax-erp:theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("suryax-erp:theme", next ? "dark" : "light");
  };

  const results = query
    ? navSections
        .flatMap((s) => s.items)
        .filter((i) => i.title.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card px-4 md:px-6">
      <button
        onClick={onToggleSidebar}
        className="grid size-9 place-items-center rounded-[10px] text-text-secondary transition-colors hover:bg-muted"
        aria-label="Toggle sidebar"
      >
        <Menu className="size-[19px]" />
      </button>

      <div className="relative w-full max-w-[350px]">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anything..."
          className="h-10 w-full rounded-[10px] border border-[#E2E4ED] bg-muted pr-3 pl-9 text-[13px] outline-none placeholder:text-text-muted focus:border-brand focus:shadow-[0_0_0_3px_rgba(79,32,216,0.08)] dark:border-border"
        />
        {results.length > 0 && (
          <div className="absolute top-12 left-0 w-full overflow-hidden rounded-[12px] border border-border bg-popover shadow-[var(--shadow-pop)]">
            {results.map((r) => (
              <button
                key={r.url}
                onMouseDown={() => {
                  setQuery("");
                  navigate({ to: r.url });
                }}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] hover:bg-accent"
              >
                <r.icon className="size-4 text-brand" />
                {r.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative grid size-9 place-items-center rounded-[10px] text-text-secondary hover:bg-muted"
              aria-label="Notifications"
            >
              <Bell className="size-[18px]" />
              <span className="absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-brand text-[9px] font-bold text-white">
                4
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((n) => (
              <DropdownMenuItem key={n.title} className="flex-col items-start gap-0.5">
                <span className="text-[13px] font-medium">{n.title}</span>
                <span className="text-[11.5px] text-text-muted">
                  {n.desc} • {n.time}
                </span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => navigate({ to: "/notifications" })}>
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          to="/enquiries"
          className="relative hidden size-9 place-items-center rounded-[10px] text-text-secondary hover:bg-muted sm:grid"
          aria-label="Messages"
        >
          <MessageSquare className="size-[18px]" />
          <span className="absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-brand text-[9px] font-bold text-white">
            6
          </span>
        </Link>
        <Link
          to="/calendar"
          className="hidden size-9 place-items-center rounded-[10px] text-text-secondary hover:bg-muted sm:grid"
          aria-label="Calendar"
        >
          <CalendarDays className="size-[18px]" />
        </Link>
        <button
          onClick={toggleTheme}
          className="grid size-9 place-items-center rounded-[10px] text-text-secondary hover:bg-muted"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 flex items-center gap-2 rounded-[10px] py-1 pr-2 pl-1 hover:bg-muted">
              <span className="grid size-9 place-items-center rounded-full bg-brand text-[13px] font-semibold text-white">
                SA
              </span>
              <span className="hidden text-left md:block">
                <span className="block text-[13px] leading-tight font-semibold">Super Admin</span>
                <span className="block text-[11px] text-text-muted">Administrator</span>
              </span>
              <ChevronDown className="size-4 text-text-muted" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem onSelect={() => navigate({ to: "/profile" })}>
              <User className="size-4" /> My Profile
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => navigate({ to: "/settings" })}>
              <Settings className="size-4" /> Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => navigate({ to: "/notifications" })}>
              <Activity className="size-4" /> Activity Log
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => toast.success("Logged out successfully")}>
              <LogOut className="size-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
