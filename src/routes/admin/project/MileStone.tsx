import { createFileRoute } from "@tanstack/react-router";
import { MilestonesView } from "@/components/pms/MilestonesView";

export const Route = createFileRoute("/admin/project/MileStone")({
  head: () => ({
    meta: [{ title: "Admin - Project Milestones | Vrindavan ERP" }],
  }),
  component: () => <MilestonesView basePath="/admin/project" />,
});
