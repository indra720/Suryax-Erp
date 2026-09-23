import { createFileRoute } from "@tanstack/react-router";
import { StaffTagReportView } from "@/components/staff/StaffTagReportView";

export const Route = createFileRoute("/staff/reports/visit")({
  head: () => ({
    meta: [{ title: "Staff - Site Visit Scheduled Leads | Vrindavan ERP" }],
  }),
  component: () => (
    <StaffTagReportView
      title="Site Visit Scheduled Leads"
      description="Clients with on-site inspection appointments scheduled for township properties."
      tagKey="visit"
      endpoint="visit-leads"
      badgeLabel="Visit Scheduled"
      badgeClass="bg-purple-100 text-purple-800 border-purple-300"
    />
  ),
});
