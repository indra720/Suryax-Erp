import { createFileRoute } from "@tanstack/react-router";
import { StaffTagReportView } from "@/components/staff/StaffTagReportView";

export const Route = createFileRoute("/staff/reports/other-location")({
  head: () => ({
    meta: [{ title: "Staff - Other Location Leads | Vrindavan ERP" }],
  }),
  component: () => (
    <StaffTagReportView
      title="Other Location Preference"
      description="Clients looking for properties outside the current township project areas."
      tagKey="other_location"
      endpoint="other-location-leads"
      badgeLabel="Other Location"
      badgeClass="bg-sky-100 text-sky-800 border-sky-300"
    />
  ),
});
