import { createFileRoute } from "@tanstack/react-router";
import { PmsDashboardView } from "@/components/pms/PmsDashboardView";

export const Route = createFileRoute("/admin/project/dashboard")({
  head: () => ({
    meta: [{ title: "Admin - PMS Project Dashboard | Vrindavan ERP" }],
  }),
  component: () => <PmsDashboardView basePath="/admin/project" />,
});
