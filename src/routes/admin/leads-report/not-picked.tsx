import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLeadReportView } from "@/components/erp/AdminLeadReportView";

export const Route = createFileRoute("/admin/leads-report/not-picked")({
  head: () => ({
    meta: [{ title: "Admin - Not Picked Calls | Vrindavan ERP" }],
  }),
  component: () => (
    <AdminLeadReportView
      tag="not_picked"
      title="Not Picked / Unanswered Leads"
      description="Telecaller dial attempts where customer did not answer or phone was switched off."
      badgeColor="bg-amber-100 text-amber-700"
    />
  ),
});
