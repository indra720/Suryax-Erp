import { createFileRoute } from "@tanstack/react-router";
import { StaffTagReportView } from "@/components/staff/StaffTagReportView";

export const Route = createFileRoute("/staff/reports/interested")({
  head: () => ({
    meta: [{ title: "Staff - Interested (Hot) Leads | Vrindavan ERP" }],
  }),
  component: () => (
    <StaffTagReportView
      title="Interested Leads (Hot Pipeline)"
      description="Clients showing strong intent to purchase residential or commercial property."
      tagKey="interested"
      badgeLabel="Interested"
      badgeClass="bg-emerald-100 text-emerald-800 border-emerald-300"
    />
  ),
});
