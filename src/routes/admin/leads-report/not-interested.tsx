import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLeadReportView } from "@/components/erp/AdminLeadReportView";

export const Route = createFileRoute("/admin/leads-report/not-interested")({
  head: () => ({
    meta: [{ title: "Admin - Not Interested Leads | Vrindavan ERP" }],
  }),
  component: () => (
    <AdminLeadReportView
      tag="not_interested"
      title="Not Interested Leads"
      description="Inquiries where client has declined or is not looking to invest currently."
      badgeColor="bg-rose-100 text-rose-700"
    />
  ),
});
