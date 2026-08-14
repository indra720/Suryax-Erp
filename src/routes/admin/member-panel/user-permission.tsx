import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin/member-panel/user-permission")({
  component: UserPermissionPage,
});

function UserPermissionPage() {
  return (
    <CrudPage
      config={{
        storeKey: "member-panel-user-permission",
        title: "User Permission",
        description: "Manage member panel permissions.",
        seed: [],
        columns: [
          { key: "role", title: "Role" },
          { key: "permissions", title: "Permissions" },
        ],
        fields: [
          { key: "role", label: "Role", type: "text" },
          { key: "permissions", label: "Permissions", type: "text" },
        ],
      }}
    />
  );
}
