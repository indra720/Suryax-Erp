import { createFileRoute } from "@tanstack/react-router";
import { StaffTagReportView } from "@/components/staff/StaffTagReportView";

export const Route = createFileRoute("/staff/reports/not-interested")({
  head: () => ({
    meta: [{ title: "Staff - Not Interested Leads | Vrindavan ERP" }],
  }),
  component: () => (
    <StaffTagReportView
      title="Not Interested Leads"
      description="Clients who declined property purchase or requested no further communication."
      tagKey="not_interested"
      endpoint="not-interested-leads"
      badgeLabel="Not Interested"
      badgeClass="bg-rose-100 text-rose-800 border-rose-300"
    />
  ),
});
