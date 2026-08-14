import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin/reports/logs")({
  component: SystemLogsPage,
});

function SystemLogsPage() {
  return (
    <CrudPage
      config={{
        storeKey: "reports-logs",
        title: "System Logs",
        description: "View system audit logs.",
        seed: [],
        columns: [
          { key: "action", title: "Action" },
          { key: "timestamp", title: "Timestamp" },
        ],
        fields: [
          { key: "action", label: "Action", type: "text" },
          { key: "timestamp", label: "Timestamp", type: "datetime-local" },
        ],
      }}
    />
  );
}
