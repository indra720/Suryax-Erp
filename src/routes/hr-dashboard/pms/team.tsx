import { createFileRoute } from "@tanstack/react-router";
import { TeamView } from "@/components/pms/TeamView";

export const Route = createFileRoute("/hr-dashboard/pms/team")({
  head: () => ({
    meta: [{ title: "HR - PMS Team Allocation & Workforce | Vrindavan ERP" }],
  }),
  component: () => <TeamView basePath="/hr-dashboard/pms" />,
});
