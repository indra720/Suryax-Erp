import { createFileRoute } from "@tanstack/react-router";
import { ProjectsAllView } from "@/components/pms/ProjectsAllView";

export const Route = createFileRoute("/team-leader/project/all")({
  head: () => ({
    meta: [{ title: "Team Leader - All Projects | Vrindavan ERP" }],
  }),
  component: () => <ProjectsAllView basePath="/team-leader/project" />,
});
