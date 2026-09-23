import { createFileRoute } from "@tanstack/react-router";
import { MilestonesView } from "@/components/pms/MilestonesView";

export const Route = createFileRoute("/team-leader/project/MileStone")({
  head: () => ({
    meta: [{ title: "Team Leader - Project Milestones | Vrindavan ERP" }],
  }),
  component: () => <MilestonesView basePath="/team-leader/project" />,
});
