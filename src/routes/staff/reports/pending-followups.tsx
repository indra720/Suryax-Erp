import { createFileRoute } from "@tanstack/react-router";
import { StaffTagReportView } from "@/components/staff/StaffTagReportView";

export const Route = createFileRoute("/staff/reports/pending-followups")({
  head: () => ({
    meta: [{ title: "Staff - Overdue & Pending Follow-ups | Vrindavan ERP" }],
  }),
  component: () => (
    <StaffTagReportView
      title="Pending & Overdue Follow-ups"
      description="Inquiries that missed their scheduled follow-up deadline and require immediate outreach."
      tagKey="pending_follow"
      badgeLabel="Overdue Follow-up"
      badgeClass="bg-rose-100 text-rose-800 border-rose-300"
    />
  ),
});
