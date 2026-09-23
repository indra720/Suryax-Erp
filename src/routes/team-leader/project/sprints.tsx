import { createFileRoute } from "@tanstack/react-router";
import { SprintsView } from "@/components/pms/SprintsView";

export const Route = createFileRoute("/team-leader/project/sprints")({
  head: () => ({
    meta: [{ title: "Team Leader - Project Sprints | Vrindavan ERP" }],
  }),
  component: () => <SprintsView basePath="/team-leader/project" />,
});
