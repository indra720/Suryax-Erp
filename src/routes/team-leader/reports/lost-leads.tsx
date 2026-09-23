import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Percent } from "lucide-react";
import { TagReportView } from "@/components/team-leader/TagReportView";

export const Route = createFileRoute("/team-leader/reports/lost-leads")({
  head: () => ({
    meta: [{ title: "Lost Leads Report | Team Leader Portal" }],
  }),
  component: LostLeadsReportPage,
});

export function LostLeadsReportPage() {
  return (
    <TagReportView
      title="Lost Leads Archive"
      tag="total_lost_tag"
      exportStatus="total_lost"
      description="Leads archived as lost due to budget constraints or competing purchases."
      icon={Percent}
      badgeColor="text-gray-500"
    />
  );
}
