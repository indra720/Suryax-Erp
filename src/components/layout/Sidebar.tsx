import { Link, useRouterState } from "@tanstack/react-router";
import { Building2, ChevronRight, X, ChevronDown } from "lucide-react";
import { navSections, type NavItem } from "@/lib/erp/nav";
import { cn } from "@/lib/utils";
import promo from "@/assets/promo-villa.jpg";
import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/services/auth";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function NavLinkItem({
  item,
  pathname,
  collapsed,
  onCloseMobile,
}: {
  item: NavItem;
  pathname: string;
  collapsed: boolean;
  onCloseMobile: () => void;
}) {
  const hasChildren = Boolean(item.items && item.items.length > 0);
  const active = item.url
    ? item.url === "/"
      ? pathname === "/"
      : pathname.startsWith(item.url)
    : item.items?.some((i) => (i.url ? pathname.startsWith(i.url) : false));

  const [isOpen, setIsOpen] = useState(Boolean(active));

  useEffect(() => {
    if (active) {
      setIsOpen(true);
    }
  }, [active]);

  if (hasChildren) {
    if (collapsed) {
      return (
        <li className="list-none my-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex size-10 items-center justify-center rounded-[10px] text-sidebar-fg hover:bg-white/[0.07] mx-auto transition-colors",
                  active && "bg-gradient-to-r from-[#331fa3] to-[#6732F2] text-white shadow-[0_0_10px_#6732F2]"
                )}
                title={item.title}
              >
                <item.icon className={cn("size-[18px]", active ? "text-white" : "text-sidebar-icon")} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="bg-[#1A1648] text-white border-white/10 min-w-[190px] p-1.5 shadow-2xl z-50">
              <DropdownMenuLabel className="text-xs text-gray-400 font-semibold px-2 py-1 uppercase tracking-wider">
                {item.title}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10 my-1" />
              {item.items!.map((child) => (
                <DropdownMenuItem key={child.title || child.url} asChild>
                  <Link
                    to={child.url || "#"}
                    onClick={onCloseMobile}
                    className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-gray-200 hover:text-white hover:bg-white/10 rounded-md cursor-pointer"
                  >
                    {child.icon && <child.icon className="size-3.5 shrink-0" />}
                    <span className="truncate">{child.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      );
    }

    return (
      <li className="list-none space-y-1">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex w-full h-[40px] items-center gap-2.5 rounded-[10px] px-2.5 text-[13.5px] font-medium transition-colors text-sidebar-fg hover:bg-white/[0.07] select-none cursor-pointer",
            active && !isOpen && "bg-white/[0.08] text-white",
            isOpen && "text-white"
          )}
        >
          <item.icon className={cn("size-[17px] shrink-0", active || isOpen ? "text-white" : "text-sidebar-icon")} />
          <span className="truncate flex-1 text-left">{item.title}</span>
          <ChevronDown
            className={cn(
              "size-3.5 transition-transform duration-200 shrink-0 text-sidebar-icon",
              isOpen && "rotate-180 text-white"
            )}
          />
        </button>
        {isOpen && (
          <ul className="pl-3 mt-1 space-y-[2px] border-l border-white/15 ml-4">
            {item.items!.map((child) => (
              <NavLinkItem
                key={child.title || child.url}
                item={child}
                pathname={pathname}
                collapsed={collapsed}
                onCloseMobile={onCloseMobile}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li className="list-none">
      <Link
        to={item.url || "#"}
        onClick={onCloseMobile}
        title={item.title}
        className={cn(
          "flex h-[40px] items-center gap-2.5 rounded-[10px] px-2.5 text-[13.5px] font-medium transition-colors",
          active
            ? "bg-gradient-to-r from-[#331fa3] to-[#6732F2] text-white shadow-[0_0_10px_#6732F2]"
            : "text-sidebar-fg hover:bg-white/[0.07]",
          collapsed && "justify-center px-0",
        )}
      >
        <item.icon className={cn("size-[17px] shrink-0", active ? "text-white" : "text-sidebar-icon")} />
        {!collapsed && (
          <span className="truncate">{item.title}</span>
        )}
      </Link>
    </li>
  );
}

export function Sidebar({
  collapsed,
  mobileOpen,
  onCloseMobile,
}: {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const width = collapsed ? "w-[72px]" : "w-[240px]";
  const { user } = useAuth();
  // Strict role-based isolation:
  const isSuperAdmin = pathname.startsWith("/superadmin") || (user?.role === "superadmin" && !pathname.startsWith("/admin"));
  const isAdmin = !isSuperAdmin && (pathname.startsWith("/admin") || user?.role === "admin");
  const isStaff = !isSuperAdmin && !isAdmin && (pathname.startsWith("/staff") || user?.role === "staff");

  const computedSections = navSections
    .filter((section) => {
      // 1. Hide Superadmin Controls from Admin and other non-superadmin roles
      if (!isSuperAdmin && section.label === "Superadmin Controls") {
        return false;
      }
      // 2. Hide Admin CRM Controls from Superadmin and Staff
      if (isSuperAdmin && section.label === "Admin CRM Controls") {
        return false;
      }
      if (isStaff && (section.label === "Admin CRM Controls" || section.label === "Superadmin Controls")) {
        return false;
      }
      return true;
    })
    .map((section) => {
      // Route the primary top dashboard link strictly according to role
      if (!section.label) {
        let dashboardTitle = "Admin Dashboard";
        let dashboardUrl = "/admin/dashboard";

        if (isSuperAdmin) {
          dashboardTitle = "Superadmin Dashboard";
          dashboardUrl = "/superadmin/dashboard";
        } else if (isStaff) {
          dashboardTitle = "Staff Dashboard";
          dashboardUrl = "/staff/dashboard";
        }

        return {
          ...section,
          items: section.items.map((it) =>
            it.title.includes("Dashboard") ? { ...it, title: dashboardTitle, url: dashboardUrl } : it
          ),
        };
      }
      return section;
    });

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[rgba(10,15,50,0.45)] lg:hidden"
          onClick={onCloseMobile}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar-bg transition-[width,transform] duration-200",
          width,
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-16 shrink-0 items-center gap-2.5 px-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-[10px] ">
            <img src={logo} alt="Vrindavan Logo" sizes="36px" />
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-[16px] leading-none font-extrabold tracking-wide text-white">
                VRINDAVAN
              </p>
              <p className="mt-1 text-[9px] font-semibold tracking-[0.12em] text-white uppercase">
                Real Estate ERP
              </p>
            </div>
          )}
          <button
            onClick={onCloseMobile}
            className="ml-auto text-sidebar-icon lg:hidden"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="no-scrollbar flex-1 overflow-y-auto px-3 pb-4 py-3">
          {computedSections.map((section, si) => (
            <div key={si} className="mb-1">
              {section.label && !collapsed && (
                <p className="mt-3 mb-1 px-2 text-[11px] font-semibold tracking-[0.06em] text-sidebar-label uppercase">
                  {section.label}
                </p>
              )}
              <ul className="space-y-[3px]">
                {section.items.map((item) => (
                  <NavLinkItem key={item.title} item={item} pathname={pathname} collapsed={collapsed} onCloseMobile={onCloseMobile} />
                ))}
              </ul>
            </div>
          ))}
          {!collapsed && (
            <div className="relative mt-4 overflow-hidden rounded-[14px] bg-gradient-to-br from-[#3A1FA8] to-[#1B2270] p-3">
              <img
                src={promo}
                alt="Suryax property"
                loading="lazy"
                className="absolute right-0 bottom-0 h-16 w-20 rounded-tl-[14px] object-cover opacity-45"
              />
              <p className="relative text-[13px] font-semibold text-white">Suryax ERP</p>
              <p className="relative mt-0.5 text-[10.5px] text-white/70">
                Smart Real Estate Solutions
              </p>
              <Link
                to="/organization"
                className="relative mt-2.5 inline-flex h-7 items-center rounded-lg bg-[#F4A51C] px-2.5 text-[11px] font-semibold text-[#3A2000] transition-transform hover:scale-[1.02]"
              >
                Upgrade Plan
              </Link>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
