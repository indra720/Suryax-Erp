import { createFileRoute } from "@tanstack/react-router";
import { MilestonesView } from "@/components/pms/MilestonesView";

export const Route = createFileRoute("/superadmin/project/MileStone")({
  head: () => ({
    meta: [{ title: "Superadmin - Project Milestones | Vrindavan ERP" }],
  }),
  component: () => <MilestonesView basePath="/superadmin/project" />,
});
