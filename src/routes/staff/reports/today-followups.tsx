import { createFileRoute } from "@tanstack/react-router";
import { StaffTagReportView } from "@/components/staff/StaffTagReportView";

export const Route = createFileRoute("/staff/reports/today-followups")({
  head: () => ({
    meta: [{ title: "Staff - Today's Scheduled Follow-ups | Vrindavan ERP" }],
  }),
  component: () => (
    <StaffTagReportView
      title="Today's Scheduled Follow-ups"
      description="All customer callbacks and follow-ups queued for action today."
      tagKey="today_follow"
      badgeLabel="Today Follow-up"
      badgeClass="bg-blue-100 text-blue-800 border-blue-300"
    />
  ),
});
