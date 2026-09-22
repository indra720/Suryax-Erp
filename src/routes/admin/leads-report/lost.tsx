import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLeadReportView } from "@/components/erp/AdminLeadReportView";

export const Route = createFileRoute("/admin/leads-report/lost")({
  head: () => ({
    meta: [{ title: "Admin - Lost Leads | Vrindavan ERP" }],
  }),
  component: () => (
    <AdminLeadReportView
      tag="lost"
      title="Lost Leads Pipeline"
      description="Leads marked as lost due to competitor purchase, budget mismatch or cancellation."
      badgeColor="bg-gray-100 text-gray-700"
    />
  ),
});
