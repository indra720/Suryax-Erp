import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLeadReportView } from "@/components/erp/AdminLeadReportView";

export const Route = createFileRoute("/admin/leads-report/interested")({
  head: () => ({
    meta: [{ title: "Admin - Interested Hot Leads | Vrindavan ERP" }],
  }),
  component: () => (
    <AdminLeadReportView
      tag="interested"
      title="Interested (Hot Leads)"
      description="Clients with verified high buying intent ready for immediate project site visits & property booking."
      badgeColor="bg-blue-100 text-blue-700"
    />
  ),
});
