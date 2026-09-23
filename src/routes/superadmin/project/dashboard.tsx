import { createFileRoute } from "@tanstack/react-router";
import { PmsDashboardView } from "@/components/pms/PmsDashboardView";

export const Route = createFileRoute("/superadmin/project/dashboard")({
  head: () => ({
    meta: [{ title: "Superadmin - PMS Project Dashboard | Vrindavan ERP" }],
  }),
  component: () => <PmsDashboardView basePath="/superadmin/project" />,
});
