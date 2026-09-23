import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { TagReportView } from "@/components/team-leader/TagReportView";

export const Route = createFileRoute("/team-leader/reports/visit")({
  head: () => ({
    meta: [{ title: "Total Visits Report | Team Leader Portal" }],
  }),
  component: TotalVisitsReportPage,
});

export function TotalVisitsReportPage() {
  return (
    <TagReportView
      title="Site Visits Report"
      tag="total_visit_tag"
      exportStatus="total_visit"
      description="Prospects verified and logged under physical site visit status."
      icon={Eye}
      badgeColor="text-emerald-500"
    />
  );
}
