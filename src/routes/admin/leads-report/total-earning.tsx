import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminLeadReportView } from "@/components/erp/AdminLeadReportView";

export const Route = createFileRoute("/admin/leads-report/total-earning")({
  head: () => ({
    meta: [{ title: "Admin - Total Lead Earnings | Vrindavan ERP" }],
  }),
  component: () => (
    <AdminLeadReportView
      tag="total_earning"
      title="Revenue Generating Booked Leads"
      description="Inquiries converted to confirmed plot/flat bookings with booking tokens recorded."
      badgeColor="bg-yellow-100 text-yellow-800"
    />
  ),
});
