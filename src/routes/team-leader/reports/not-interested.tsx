import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { XCircle } from "lucide-react";
import { TagReportView } from "@/components/team-leader/TagReportView";

export const Route = createFileRoute("/team-leader/reports/not-interested")({
  head: () => ({
    meta: [{ title: "Not Interested Leads | Team Leader Portal" }],
  }),
  component: NotInterestedReportPage,
});

export function NotInterestedReportPage() {
  return (
    <TagReportView
      title="Not Interested Prospects"
      tag="total_not_interested_tag"
      exportStatus="total_not_interested"
      description="Customers who declined property proposals or have no current buying requirement."
      icon={XCircle}
      badgeColor="text-red-500"
    />
  );
}
