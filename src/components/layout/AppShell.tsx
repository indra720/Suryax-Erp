import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div
        className={cn(
          "flex min-h-screen flex-col transition-[margin] duration-200",
          collapsed ? "lg:ml-[72px]" : "lg:ml-[240px]",
        )}
      >
        <Navbar
          onToggleSidebar={() => {
            if (window.innerWidth < 1024) setMobileOpen((v) => !v);
            else setCollapsed((v) => !v);
          }}
        />
        <main className="min-w-0 flex-1 p-[22px]">{children}</main>
      </div>
    </div>
  );
}
