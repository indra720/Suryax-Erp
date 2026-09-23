import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle } from "lucide-react";
import { TagReportView } from "@/components/team-leader/TagReportView";

export const Route = createFileRoute("/team-leader/reports/interested")({
  head: () => ({
    meta: [{ title: "Interested Leads Report | Team Leader Portal" }],
  }),
  component: InterestedReportPage,
});

export function InterestedReportPage() {
  return (
    <TagReportView
      title="Interested Prospects"
      tag="total_interested_tag"
      exportStatus="total_interested"
      description="Customers verified as interested in Vrindavan properties."
      icon={CheckCircle}
      badgeColor="text-teal-500"
    />
  );
}
