import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { Building } from "lucide-react";

export const Route = createFileRoute("/admin/member-panel/open")({
  component: OpenPanelPage,
});

function OpenPanelPage() {
  return (
    <CrudPage
      config={{
        storeKey: "member-panel-open",
        title: "Open Panel",
        description: "View open member panels.",
        seed: [],
        columns: [
          { key: "panelName", title: "Panel Name" },
          { key: "status", title: "Status" },
        ],
        fields: [
          { key: "panelName", label: "Panel Name", type: "text" },
          { key: "status", label: "Status", type: "text" },
        ],
      }}
    />
  );
}
