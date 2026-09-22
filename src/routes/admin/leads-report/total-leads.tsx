import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLeadReportView } from "@/components/erp/AdminLeadReportView";

export const Route = createFileRoute("/admin/leads-report/total-leads")({
  head: () => ({
    meta: [{ title: "Admin - Total Leads | Vrindavan ERP" }],
  }),
  component: () => (
    <AdminLeadReportView
      tag="all"
      title="All Branch Leads"
      description="Consolidated overview of all leads generated, telecalled, and assigned across your branch."
      badgeColor="bg-purple-100 text-purple-700"
    />
  ),
});
