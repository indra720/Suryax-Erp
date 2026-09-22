import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLeadReportView } from "@/components/erp/AdminLeadReportView";

export const Route = createFileRoute("/admin/leads-report/other-location")({
  head: () => ({
    meta: [{ title: "Admin - Other Location Leads | Vrindavan ERP" }],
  }),
  component: () => (
    <AdminLeadReportView
      tag="other_location"
      title="Other Location Inquiries"
      description="Customers inquiring about properties outside current Vrindavan / Mathura inventory sectors."
      badgeColor="bg-orange-100 text-orange-700"
    />
  ),
});
