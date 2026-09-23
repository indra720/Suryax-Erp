import { createFileRoute } from "@tanstack/react-router";
import { StaffTagReportView } from "@/components/staff/StaffTagReportView";

export const Route = createFileRoute("/staff/reports/tomorrow-followups")({
  head: () => ({
    meta: [{ title: "Staff - Tomorrow's Scheduled Follow-ups | Vrindavan ERP" }],
  }),
  component: () => (
    <StaffTagReportView
      title="Tomorrow's Scheduled Follow-ups"
      description="Inquiries and callbacks planned for tomorrow's telecalling schedule."
      tagKey="tommorrow_follow"
      badgeLabel="Tomorrow Follow-up"
      badgeClass="bg-indigo-100 text-indigo-800 border-indigo-300"
    />
  ),
});
