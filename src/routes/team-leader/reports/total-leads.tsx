import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { TagReportView } from "@/components/team-leader/TagReportView";

export const Route = createFileRoute("/team-leader/reports/total-leads")({
  head: () => ({
    meta: [{ title: "Total Leads Report | Team Leader Portal" }],
  }),
  component: TotalLeadsReportPage,
});

export function TotalLeadsReportPage() {
  return (
    <TagReportView
      title="Total Leads Report"
      tag="total_leads_tag"
      exportStatus="total_leads"
      description="All incoming calling leads assigned to your team telecallers."
      icon={Users}
      badgeColor="text-rose-500"
    />
  );
}
