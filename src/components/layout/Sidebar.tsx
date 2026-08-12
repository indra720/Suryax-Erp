import { Link, useRouterState } from "@tanstack/react-router";
import { Building2, ChevronRight, X } from "lucide-react";
import { navSections } from "@/lib/erp/nav";
import { cn } from "@/lib/utils";
import promo from "@/assets/promo-villa.jpg";
import logo from "../../assets/logo.png"
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
            <img src={logo} alt="Suryax Logo" sizes="36px" />
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-[16px] leading-none font-extrabold tracking-wide text-white">
                SURYAX
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
        {/* Nav section  */}
        <nav className="no-scrollbar flex-1 overflow-y-auto px-3 pb-4 py-3">
          {navSections.map((section, si) => (
            <div key={si} className="mb-1">
              {section.label && !collapsed && (
                <p className="mt-3 mb-1 px-2 text-[11px] font-semibold tracking-[0.06em] text-sidebar-label uppercase">
                  {section.label}
                </p>
              )}
              {section.label && collapsed && <div className="my-2 h-px bg-white/10" />}
              <ul className="space-y-[3px]">
                {section.items.map((item) => {
                  const active =
                    item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);
                  return (
                    <li key={item.url}>
                      <Link
                        to={item.url}
                        onClick={onCloseMobile}
                        title={item.title}
                        className={cn(
                          "flex h-[40px] items-center gap-2.5 rounded-[10px] px-2.5  text-[13.5px] font-medium transition-colors",
                          active
                            ? "bg-gradient-to-r from-[#331fa3] to-[#6732F2] text-white shadow-[0_0_10px_#6732F2] "
                            : "text-sidebar-fg hover:bg-white/[0.07]",
                          collapsed && "justify-center px-0",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "size-[17px] shrink-0",
                            active ? "text-white" : "text-sidebar-icon",
                          )}
                        />
                        {!collapsed && (
                          <>
                            <span className="truncate">{item.title}</span>
                            <ChevronRight
                              className={cn(
                                "ml-auto size-3.5",
                                active ? "text-white/70" : "text-sidebar-icon/60",
                              )}
                            />
                          </>
                        )}
                      </Link>
                    </li>
                  );
                })}
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
