import { createFileRoute } from "@tanstack/react-router";
import { MilestonesView } from "@/components/pms/MilestonesView";

export const Route = createFileRoute("/hr-dashboard/pms/milestones")({
  head: () => ({
    meta: [{ title: "HR - PMS Project Milestones | Vrindavan ERP" }],
  }),
  component: () => <MilestonesView basePath="/hr-dashboard/pms" />,
});
