import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { LayoutDashboard } from "lucide-react";

export const Route = createFileRoute("/admin/settings/dashboard-permission")({
  component: DashboardPermissionPage,
});

function DashboardPermissionPage() {
  return (
    <CrudPage
      config={{
        storeKey: "settings-dashboard-permission",
        title: "Dashboard Permission",
        description: "Configure dashboard module access.",
        seed: [],
        columns: [
          { key: "permissions", title: "Permissions" },
          { key: "tabName", title: "Tab Name" },
          { key: "createdBy", title: "Created By" },
          { key: "createdDate", title: "Created Date" },
        ],
        fields: [
          { key: "permissions", label: "Permissions", type: "text" },
          { key: "tabName", label: "Tab Name", type: "text" },
        ],
      }}
    />
  );
}
