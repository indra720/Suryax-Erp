import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PhoneOff } from "lucide-react";
import { TagReportView } from "@/components/team-leader/TagReportView";

export const Route = createFileRoute("/team-leader/reports/not-picked")({
  head: () => ({
    meta: [{ title: "Not Picked Calls | Team Leader Portal" }],
  }),
  component: NotPickedReportPage,
});

export function NotPickedReportPage() {
  return (
    <TagReportView
      title="Not Picked / Unreachable"
      tag="total_not_picked_tag"
      exportStatus="total_not_picked"
      description="Inquiries where telecaller dials were unanswered or phone was switched off."
      icon={PhoneOff}
      badgeColor="text-slate-500"
    />
  );
}
