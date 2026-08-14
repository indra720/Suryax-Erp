import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/admin/reports/site-visit")({
  component: SiteVisitReportsPage,
});

function SiteVisitReportsPage() {
  return (
    <CrudPage
      config={{
        storeKey: "reports-site-visit",
        title: "Site Visit Reports",
        description: "View site visit history and reports.",
        seed: [],
        columns: [
          { key: "visitorName", title: "Visitor Name" },
          { key: "visitDate", title: "Visit Date" },
        ],
        fields: [
          { key: "visitorName", label: "Visitor Name", type: "text" },
          { key: "visitDate", label: "Visit Date", type: "date" },
        ],
      }}
    />
  );
}
