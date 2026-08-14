import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { Users } from "lucide-react";

export const Route = createFileRoute("/admin/reports/lead")({
  component: LeadReportsPage,
});

function LeadReportsPage() {
  return (
    <CrudPage
      config={{
        storeKey: "reports-lead",
        title: "Lead Reports",
        description: "View lead funnel and assignment reports.",
        seed: [],
        columns: [
          { key: "leadName", title: "Lead Name" },
          { key: "source", title: "Source" },
        ],
        fields: [
          { key: "leadName", label: "Lead Name", type: "text" },
          { key: "source", label: "Source", type: "text" },
        ],
      }}
    />
  );
}
