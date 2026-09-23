import { createFileRoute } from "@tanstack/react-router";
import { StaffTagReportView } from "@/components/staff/StaffTagReportView";

export const Route = createFileRoute("/staff/reports/total-leads")({
  head: () => ({
    meta: [{ title: "Staff - All Calling Leads | Vrindavan ERP" }],
  }),
  component: () => (
    <StaffTagReportView
      title="Total Leads Report"
      description="All customer inquiries assigned to you for telecalling and follow-up."
      tagKey="total_leads"
      badgeLabel="All Leads"
      badgeClass="bg-blue-100 text-blue-800 border-blue-300"
    />
  ),
});
