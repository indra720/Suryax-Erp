import { createFileRoute } from "@tanstack/react-router";
import { PmsDashboardView } from "@/components/pms/PmsDashboardView";

export const Route = createFileRoute("/team-leader/project/dashboard")({
  head: () => ({
    meta: [{ title: "Team Leader - PMS Dashboard | Vrindavan ERP" }],
  }),
  component: () => <PmsDashboardView basePath="/team-leader/project" />,
});
