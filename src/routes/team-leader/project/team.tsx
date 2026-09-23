import { createFileRoute } from "@tanstack/react-router";
import { TeamView } from "@/components/pms/TeamView";

export const Route = createFileRoute("/team-leader/project/team")({
  head: () => ({
    meta: [{ title: "Team Leader - Project Team | Vrindavan ERP" }],
  }),
  component: () => <TeamView basePath="/team-leader/project" />,
});
