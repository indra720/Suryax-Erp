import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/erp/CrudPage";
import { UsersRound } from "lucide-react";

export const Route = createFileRoute("/admin/reports/associate")({
  component: AssociateReportsPage,
});

function AssociateReportsPage() {
  return (
    <CrudPage
      config={{
        storeKey: "reports-associate",
        title: "Associate Reports",
        description: "View associate performance and commission reports.",
        seed: [],
        columns: [
          { key: "associateName", title: "Associate Name" },
          { key: "totalBookings", title: "Total Bookings" },
          { key: "totalCommission", title: "Total Commission" },
        ],
        fields: [
          { key: "associateName", label: "Associate Name", type: "text" },
          { key: "totalBookings", label: "Total Bookings", type: "number" },
          { key: "totalCommission", label: "Total Commission", type: "number" },
        ],
      }}
    />
  );
}
