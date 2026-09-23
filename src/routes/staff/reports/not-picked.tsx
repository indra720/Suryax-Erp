import { createFileRoute } from "@tanstack/react-router";
import { StaffTagReportView } from "@/components/staff/StaffTagReportView";

export const Route = createFileRoute("/staff/reports/not-picked")({
  head: () => ({
    meta: [{ title: "Staff - Not Picked Leads | Vrindavan ERP" }],
  }),
  component: () => (
    <StaffTagReportView
      title="Not Picked / Unanswered Calls"
      description="Calls that rang with no answer, switched off, or temporarily unavailable."
      tagKey="not_picked"
      endpoint="not-picked-leads"
      badgeLabel="Not Picked"
      badgeClass="bg-amber-100 text-amber-800 border-amber-300"
    />
  ),
});
