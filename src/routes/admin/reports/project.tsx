import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { Building2 } from "lucide-react";

export const Route = createFileRoute("/admin/reports/project")({
  component: ProjectReportsPage,
});

function ProjectReportsPage() {
  return (
    <CrudPage
      config={{
        storeKey: "reports-project",
        title: "Project Reports",
        description: "View project inventory and status reports.",
        seed: [],
        columns: [
          { key: "projectName", title: "Project Name" },
          { key: "status", title: "Status" },
        ],
        fields: [
          { key: "projectName", label: "Project Name", type: "text" },
          { key: "status", label: "Status", type: "text" },
        ],
      }}
    />
  );
}
