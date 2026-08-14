import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { MessageSquare } from "lucide-react";

export const Route = createFileRoute("/admin/social/integration")({
  component: IntegrationPage,
});

function IntegrationPage() {
  return (
    <CrudPage
      config={{
        storeKey: "integration",
        title: "Integration",
        description: "Manage social media integrations.",
        seed: [],
        columns: [
          { key: "service", title: "Service" },
          { key: "status", title: "Status" },
        ],
        fields: [
          { key: "service", label: "Service", type: "text" },
          { key: "status", label: "Status", type: "text" },
        ],
      }}
    />
  );
}
