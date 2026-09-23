import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { TagReportView } from "@/components/team-leader/TagReportView";

export const Route = createFileRoute("/team-leader/reports/other-location")({
  head: () => ({
    meta: [{ title: "Other Location Leads | Team Leader Portal" }],
  }),
  component: OtherLocationReportPage,
});

export function OtherLocationReportPage() {
  return (
    <TagReportView
      title="Other Location Prospects"
      tag="total_other_location_tag"
      exportStatus="total_other_location"
      description="Customers inquiring about properties outside our current active development sites."
      icon={MapPin}
      badgeColor="text-orange-500"
    />
  );
}
