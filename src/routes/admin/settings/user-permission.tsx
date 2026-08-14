import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin/settings/user-permission")({
  component: UserPermissionPage,
});

function UserPermissionPage() {
  return (
    <CrudPage
      config={{
        storeKey: "settings-user-permission",
        title: "User Permission",
        description: "Manage role-based permissions.",
        seed: [],
        columns: [
          { key: "role", title: "Role" },
          { key: "view", title: "View" },
          { key: "add", title: "Add" },
          { key: "edit", title: "Edit" },
          { key: "delete", title: "Delete" },
          { key: "print", title: "Print" },
          { key: "import", title: "Import" },
          { key: "export", title: "Export" },
        ],
        fields: [
          { key: "role", label: "Role", type: "text" },
          { key: "view", label: "View", type: "checkbox" },
          { key: "add", label: "Add", type: "checkbox" },
          { key: "edit", label: "Edit", type: "checkbox" },
          { key: "delete", label: "Delete", type: "checkbox" },
          { key: "print", label: "Print", type: "checkbox" },
          { key: "import", label: "Import", type: "checkbox" },
          { key: "export", label: "Export", type: "checkbox" },
        ],
      }}
    />
  );
}
