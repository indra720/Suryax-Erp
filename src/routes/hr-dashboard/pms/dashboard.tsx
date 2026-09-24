import { createFileRoute } from "@tanstack/react-router";
import { PmsDashboardView } from "@/components/pms/PmsDashboardView";

export const Route = createFileRoute("/hr-dashboard/pms/dashboard")({
  head: () => ({
    meta: [{ title: "HR - PMS Project Management Dashboard | Vrindavan ERP" }],
  }),
  component: () => <PmsDashboardView basePath="/hr-dashboard/pms" />,
});
