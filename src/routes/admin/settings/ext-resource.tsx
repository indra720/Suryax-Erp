import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { Megaphone } from "lucide-react";

export const Route = createFileRoute("/admin/settings/ext-resource")({
  component: ExtResourcePage,
});

function ExtResourcePage() {
  return (
    <CrudPage
      config={{
        storeKey: "settings-ext-resource",
        title: "External Resources",
        description: "Manage external service credentials.",
        seed: [],
        columns: [
          { key: "resourceType", title: "Resource Type" },
          { key: "description", title: "Description" },
        ],
        fields: [
          { key: "resourceType", label: "Resource Type", type: "text" },
          { key: "userName", label: "User Name", type: "text" },
          { key: "password", label: "Password", type: "password" },
          { key: "url", label: "URL", type: "text" },
          { key: "description", label: "Description", type: "text" },
        ],
      }}
    />
  );
}
