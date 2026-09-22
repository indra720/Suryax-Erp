import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLeadReportView } from "@/components/erp/AdminLeadReportView";

export const Route = createFileRoute("/admin/leads-report/visit")({
  head: () => ({
    meta: [{ title: "Admin - Site Visits Scheduled | Vrindavan ERP" }],
  }),
  component: () => (
    <AdminLeadReportView
      tag="visit"
      title="Site Visit Scheduled Leads"
      description="Confirmed on-ground project site tours and customer site inspection queues."
      badgeColor="bg-emerald-100 text-emerald-700"
    />
  ),
});
